import { WebSocketServer, type WebSocket } from "ws";

type TLatLng = {
  lat: number;
  lng: number;
};

const PORT = 9090;
const TOPIC_CONTROL = "/control/command/control_cmd";
const TOPIC_GPS = "/novatel/oem7/gps";
const TOPIC_HEADING = "/novatel/oem7/heading2";
const TOPIC_PATH = "/utm_path";

const START: TLatLng = { lat: 50.8084, lng: 14.8821 };
const WAYPOINTS: TLatLng[] = [];

const SPEED_MPS = 5.0;
const TICK_HZ = 5;
const TICK_MS = 1000 / TICK_HZ;

// Active mission. Starts as the demo WAYPOINTS, but gets replaced when the
// app publishes a real mission via "Send to Vehicle" (/utm_path).
let missionWaypoints = [...WAYPOINTS];

const vehicle = {
  autopilot: false,
  heading: 45,
  lat: START.lat,
  lng: START.lng,
  speed: 0,
  wpIndex: 0,
};

const manualCmd = {
  lastSeen: 0,
  speed: 0,
  steer: 0,
};
const MANUAL_TIMEOUT_MS = 600;
const STEER_GAIN = 60;

const R = 6371000;
const toRad = (d: number): number => (d * Math.PI) / 180;
const toDeg = (r: number): number => (r * 180) / Math.PI;

const distanceM = (a: TLatLng, b: TLatLng): number => {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
};

const bearingDeg = (a: TLatLng, b: TLatLng): number => {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
};

const step = (from: TLatLng, to: TLatLng, meters: number): TLatLng => {
  const d = distanceM(from, to);

  if (d <= meters || d === 0) return { ...to };
  const frac = meters / d;

  return {
    lat: from.lat + (to.lat - from.lat) * frac,
    lng: from.lng + (to.lng - from.lng) * frac,
  };
};

const projectByHeading = (from: TLatLng, headingDeg: number, meters: number): TLatLng => {
  const dNorth = meters * Math.cos(toRad(headingDeg));
  const dEast = meters * Math.sin(toRad(headingDeg));
  const dLat = toDeg(dNorth / R);
  const dLng = toDeg(dEast / (R * Math.cos(toRad(from.lat))));

  return { lat: from.lat + dLat, lng: from.lng + dLng };
};

const wss = new WebSocketServer({ port: PORT });
const subscriptions = new Set();

const send = (ws: WebSocket, obj: object): void => {
  if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(obj));
};

const publishGps = (ws: WebSocket): void => {
  if (!subscriptions.has(TOPIC_GPS)) return;

  send(ws, {
    msg: {
      altitude: 400,
      err: 0,
      latitude: vehicle.lat,
      longitude: vehicle.lng,
      speed: vehicle.speed,
      status: { satellites_used: 8, satellites_visible: 20 },
    },
    op: "publish",
    topic: TOPIC_GPS,
  });
};

const publishHeading = (ws: WebSocket): void => {
  if (!subscriptions.has(TOPIC_HEADING)) return;
  send(ws, {
    msg: { heading: vehicle.heading },
    op: "publish",
    topic: TOPIC_HEADING,
  });
};

wss.on("connection", (ws) => {
  console.info("Client connected (app)");

  ws.on("message", (raw) => {
    let m;

    try {
      m = JSON.parse(raw.toString());
    } catch {
      return;
    }

    switch (m.op) {
      case "subscribe":
        subscriptions.add(m.topic);
        console.info("subscribe:", m.topic);
        if (m.topic === TOPIC_GPS) publishGps(ws);
        if (m.topic === TOPIC_HEADING) publishHeading(ws);
        break;

      case "unsubscribe":
        subscriptions.delete(m.topic);
        break;

      case "advertise":
        console.info("advertise:", m.topic);
        break;

      case "publish":
        if (m.topic === TOPIC_CONTROL) {
          const speed = m.msg?.longitudinal?.speed ?? 0;
          const steer = m.msg?.lateral?.steering_tire_angle ?? 0;

          if (speed !== 0 || steer !== 0) vehicle.autopilot = false;
          manualCmd.speed = speed;
          manualCmd.steer = steer;
          manualCmd.lastSeen = Date.now();
        }

        if (m.topic === TOPIC_PATH) {
          const poses: {
            pose: {
              position: {
                x: number;
                y: number;
              };
            };
          }[] = m.msg?.poses ?? [];
          const mission = poses
            .map((p) => ({
              lat: p?.pose?.position?.x,
              lng: p?.pose?.position?.y,
            }))
            .filter((wp) => Number.isFinite(wp.lat) && Number.isFinite(wp.lng));

          if (mission.length > 1) {
            const [start, ...rest] = mission;

            vehicle.lat = start.lat;
            vehicle.lng = start.lng;
            missionWaypoints = rest;
            vehicle.wpIndex = 0;
            vehicle.autopilot = true;
            console.info(`Received mission: ${rest.length} waypoints -> driving`);
          }
        }
        break;

      default:
        break;
    }
  });

  const timer = setInterval(() => {
    if (vehicle.autopilot && vehicle.wpIndex < missionWaypoints.length) {
      const target = missionWaypoints[vehicle.wpIndex];
      const here = { lat: vehicle.lat, lng: vehicle.lng };

      vehicle.heading = bearingDeg(here, target);
      vehicle.speed = SPEED_MPS;

      const metersPerTick = SPEED_MPS / TICK_HZ;
      const next = step(here, target, metersPerTick);

      vehicle.lat = next.lat;
      vehicle.lng = next.lng;

      if (distanceM(next, target) < 1) {
        console.info(`Reached waypoint ${vehicle.wpIndex + 1}`);
        vehicle.wpIndex += 1;
        if (vehicle.wpIndex >= missionWaypoints.length) {
          console.info("Mission complete");
          vehicle.speed = 0;
          vehicle.autopilot = false;
        }
      }
    } else if (!vehicle.autopilot) {
      const fresh = Date.now() - manualCmd.lastSeen < MANUAL_TIMEOUT_MS;
      const speed = fresh ? manualCmd.speed : 0;
      const steer = fresh ? manualCmd.steer : 0;

      if (Math.abs(speed) > 0.01) {
        vehicle.heading = (vehicle.heading + steer * STEER_GAIN * (1 / TICK_HZ) + 360) % 360;
      }
      vehicle.speed = speed;

      if (Math.abs(speed) > 0.01) {
        const metersPerTick = speed / TICK_HZ;
        const next = projectByHeading(
          { lat: vehicle.lat, lng: vehicle.lng },
          vehicle.heading,
          metersPerTick,
        );

        vehicle.lat = next.lat;
        vehicle.lng = next.lng;
      }
    }

    publishGps(ws);
    publishHeading(ws);
  }, TICK_MS);

  ws.on("close", () => {
    clearInterval(timer);
    console.info("Client disconnected");
  });
});

console.info(`RosBridge is listening on ws://localhost:${PORT}...`);
console.info("Commands:  a = engage autopilot, s = stop, r = reset to start");
process.stdin.setRawMode?.(true);
process.stdin.resume();

process.stdin.on("data", (buf) => {
  const k = buf.toString();

  if (k === "a") {
    vehicle.autopilot = true;
    vehicle.wpIndex = 0;
    console.info(">> autopilot engaged");
  } else if (k === "s") {
    vehicle.autopilot = false;
    vehicle.speed = 0;
    console.info(">> stopped");
  } else if (k === "r") {
    vehicle.lat = START.lat;
    vehicle.lng = START.lng;
    vehicle.wpIndex = 0;
    vehicle.autopilot = false;
    vehicle.speed = 0;
    missionWaypoints = [...WAYPOINTS];
    console.info(">> reset");
  } else if (k === "\u0003") {
    process.exit(0);
  }
});
