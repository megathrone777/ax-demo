import type { Position } from "geojson";

declare global {
  interface TVehicle {
    active: boolean;
    data: {
      control_mode: number;
      gear_status: number;
      id: number;
      ip_addr: string;
      position: {
        lat: number;
        lon: number;
      };
      vehicle_status: {
        speed: number;
        steer: number;
      };
    };
    id: number;
  }

  interface TSuggestion {
    center: Position;
    id: number;
    title: string;
  }

  interface TGPSData {
    altitude: number;
    err: number;
    latitude: number;
    longitude: number;
    speed: number;
    status: {
      satellites_used: number;
      satellites_visible: number;
    };
  }
}

export {};
