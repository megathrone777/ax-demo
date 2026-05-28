import type { Feature, Point, Polygon, Position } from "geojson";

declare global {
  type TMapId = "controlsMap" | "mainMap";

  interface TVehiclePosition {
    lat: number;
    lon: number;
  }

  interface TVehicle {
    active: boolean;
    controlMode: number;
    gearStatus: number;
    id: number;
    ipAddres: string;
    position: TVehiclePosition;
    speed: number;
    steer: number;
  }

  interface TVehicleProps {
    avgSpeed: number;
    localGoalpointRadius: number;
    maxSteerAngle: number;
    pathFixRadius: number;
    pathNum: number;
    pathPerSquareAngle: number;
    pathStep: number;
    squareAngleLimit: number;
    squareMapSizeX: number;
    squareMapSizeY: number;
    squareSizeX: number;
    squareSizeY: number;
    vehicleWheelBase: number;
    vehicleWheelWidth: number;
    wheelTurnRate: number;
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
      satellitesUsed: number;
      satellitesVisible: number;
    };
  }

  type TDestinationDelay = "0" | "1" | "120" | "30" | "60";
  type TDestinationPosition = Feature<Point, { delay: TDestinationDelay; name: string }>;

  interface TDestination {
    id: number;
    name: string;
    positions: TDestinationPosition[];
    waypoints: Position[];
  }

  interface TBoundary {
    id: number;
    polygons: Feature<Polygon>[];
  }

  interface TUser {
    password: string;
    username: string;
  }
}

export {};
