import { readFileSync } from "fs";
import { createServer } from "https";
import { resolve } from "path";

import { WebSocketServer, type WebSocket } from "ws";

import { TopicsTypes, TMessage, TVehicleData } from "./ros.types";

const port = 9090;
const server = createServer({
  cert: readFileSync(resolve(import.meta.dirname, "../../certificates/localhost-cert.pem")),
  key: readFileSync(resolve(import.meta.dirname, "../../certificates/localhost-key.pem")),
}).listen(port);

const initialData: TVehicleData = {
  autoPilot: false,
  heading: 45,
  latitude: 50.8084,
  longitude: 14.8821,
  speed: 5,
  waypointIndex: 0,
  waypoints: [],
};

const vehicleData: TVehicleData = {
  autoPilot: false,
  heading: 45,
  latitude: 50.8084,
  longitude: 14.8821,
  speed: 5,
  waypointIndex: 0,
  waypoints: [],
};

const SPEED_MPS = 5.0;
const TICK_HZ = 5;
const TICK_MS = 1000 / TICK_HZ;

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

const distanceM = (a: TVehiclePosition, b: TVehiclePosition): number => {
  const dLat = toRad(b.latitude - a.latitude);
  const dLng = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
};

const bearingDeg = (a: TVehiclePosition, b: TVehiclePosition): number => {
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const dLng = toRad(b.longitude - a.longitude);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
};

const step = (from: TVehiclePosition, to: TVehiclePosition, meters: number): TVehiclePosition => {
  const d = distanceM(from, to);

  if (d <= meters || d === 0) return { ...to };
  const frac = meters / d;

  return {
    latitude: from.latitude + (to.latitude - from.latitude) * frac,
    longitude: from.longitude + (to.longitude - from.longitude) * frac,
  };
};

const projectByHeading = (
  from: TVehiclePosition,
  headingDeg: number,
  meters: number,
): TVehiclePosition => {
  const dNorth = meters * Math.cos(toRad(headingDeg));
  const dEast = meters * Math.sin(toRad(headingDeg));
  const dLat = toDeg(dNorth / R);
  const dLng = toDeg(dEast / (R * Math.cos(toRad(from.latitude))));

  return { latitude: from.latitude + dLat, longitude: from.longitude + dLng };
};

const wss = new WebSocketServer({
  server,
});
const subscriptions = new Set();

const sendMessage = (ws: WebSocket, message: TMessage): void => {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(message));
  }
};

const publishGps = (ws: WebSocket): void => {
  if (!subscriptions.has(TopicsTypes.GPS)) return;

  sendMessage(ws, {
    data: {
      altitude: 400,
      latitude: vehicleData.latitude,
      longitude: vehicleData.longitude,
      speed: vehicleData.speed,
      status: { satellitesUsed: 8, satellitesVisible: 20 },
    },
    option: "publish",
    topic: TopicsTypes.GPS,
  });
};

const publishHeading = (ws: WebSocket): void => {
  if (!subscriptions.has(TopicsTypes.HEADING)) return;

  sendMessage(ws, {
    data: { heading: vehicleData.heading },
    option: "publish",
    topic: TopicsTypes.HEADING,
  });
};

wss.on("connection", (ws) => {
  console.info("Client connected (app)");

  ws.on("message", (raw: WebSocket.RawData) => {
    let message: TMessage;

    try {
      message = JSON.parse(raw.toString());
    } catch {
      return;
    }

    switch (message.option) {
      case "subscribe":
        subscriptions.add(message.topic);
        console.info("subscribe:", message.topic);
        if (message.topic === TopicsTypes.GPS) publishGps(ws);
        if (message.topic === TopicsTypes.HEADING) publishHeading(ws);
        break;

      case "unsubscribe":
        subscriptions.delete(message.topic);
        break;

      case "publish":
        if (message.topic === TopicsTypes.CONTROL) {
          const speed = message.msg?.longitudinal?.speed ?? 0;
          const steer = message.msg?.lateral?.steeringTireAngle ?? 0;

          if (speed !== 0 || steer !== 0) vehicleData.autoPilot = false;
          manualCmd.speed = speed;
          manualCmd.steer = steer;
          manualCmd.lastSeen = Date.now();
        }

        if (message.topic === TopicsTypes.PATH) {
          const poses: {
            pose: {
              position: {
                x: number;
                y: number;
              };
            };
          }[] = message.msg?.poses ?? [];

          const mission = poses
            .map<TVehiclePosition>((p) => ({
              latitude: p?.pose?.position?.x,
              longitude: p?.pose?.position?.y,
            }))
            .filter((wp) => Number.isFinite(wp.latitude) && Number.isFinite(wp.longitude));

          if (mission.length > 1) {
            const [start, ...rest] = mission;

            vehicleData.latitude = start.latitude;
            vehicleData.longitude = start.longitude;
            vehicleData.waypoints = rest;
            vehicleData.autoPilot = true;
            console.info(`Received mission: ${rest.length} waypoints -> driving`);
          }
        }
        break;

      default:
        break;
    }
  });

  const timer = setInterval(() => {
    if (vehicleData.autoPilot && vehicleData.waypointIndex < vehicleData.waypoints.length) {
      const targetPosition: TVehiclePosition = vehicleData.waypoints[vehicleData.waypointIndex];
      const currentPosition: TVehiclePosition = {
        latitude: vehicleData.latitude,
        longitude: vehicleData.longitude,
      };

      vehicleData.heading = bearingDeg(currentPosition, targetPosition);
      vehicleData.speed = SPEED_MPS;

      const metersPerTick = SPEED_MPS / TICK_HZ;
      const nextPosition = step(currentPosition, targetPosition, metersPerTick);

      vehicleData.latitude = nextPosition.latitude;
      vehicleData.longitude = nextPosition.longitude;

      if (distanceM(nextPosition, targetPosition) < 1) {
        console.info(`Reached waypoint ${vehicleData.waypointIndex + 1}`);
        vehicleData.waypointIndex += 1;

        if (vehicleData.waypointIndex >= vehicleData.waypoints.length) {
          console.info("Mission complete");
          vehicleData.speed = 0;
          vehicleData.autoPilot = false;
        }
      }
    } else if (!vehicleData.autoPilot) {
      const fresh = Date.now() - manualCmd.lastSeen < MANUAL_TIMEOUT_MS;
      const speed = fresh ? manualCmd.speed : 0;
      const steer = fresh ? manualCmd.steer : 0;

      if (Math.abs(speed) > 0.01) {
        vehicleData.heading =
          (vehicleData.heading + steer * STEER_GAIN * (1 / TICK_HZ) + 360) % 360;
      }

      vehicleData.speed = speed;

      if (Math.abs(speed) > 0.01) {
        const metersPerTick = speed / TICK_HZ;
        const nextPosition = projectByHeading(
          { latitude: vehicleData.latitude, longitude: vehicleData.longitude },
          vehicleData.heading,
          metersPerTick,
        );

        vehicleData.latitude = nextPosition.latitude;
        vehicleData.longitude = nextPosition.longitude;
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

console.info(`RosBridge is listening on wss://${server.address()?.toString()}:${port}...`);
console.info("Commands:  a = engage autopilot, s = stop, r = reset to start");
process.stdin.setRawMode?.(true);
process.stdin.resume();

process.stdin.on("data", (buf) => {
  const k = buf.toString();

  if (k === "a") {
    vehicleData.autoPilot = true;
    vehicleData.waypointIndex = 0;
    console.info(">> autopilot engaged");
  } else if (k === "s") {
    vehicleData.autoPilot = false;
    vehicleData.speed = 0;
    console.info(">> stopped");
  } else if (k === "r") {
    vehicleData.latitude = initialData.latitude;
    vehicleData.longitude = initialData.longitude;
    vehicleData.waypointIndex = 0;
    vehicleData.autoPilot = false;
    vehicleData.speed = 0;
    vehicleData.waypoints = [];
    console.info(">> reset");
  } else if (k === "\u0003") {
    process.exit(0);
  }
});
