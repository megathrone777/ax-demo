import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { MapProvider } from "@vis.gl/react-maplibre";
import { RosConnection } from "rosreact";

import { getVehicles, getVehicleDetails, loginAction } from "@/api";
import { AppProvider } from "@/context";
import {
  AlertsPage,
  CamPage,
  FleetPage,
  LoginPage,
  MapPage,
  RegistrationPage,
  VehiclePage,
} from "@/pages";
import { Spinner } from "@/ui";

import { Error } from "./Error";
import { Layout } from "./Layout";

const router = createBrowserRouter(
  [
    {
      children: [
        {
          Component: FleetPage,
          index: true,
          loader: getVehicles,
        },
        {
          Component: MapPage,
          path: "map/:id?",
        },
        {
          Component: AlertsPage,
          loader: getVehicles,
          path: "alerts",
        },
        {
          Component: FleetPage,
          loader: getVehicles,
          path: "fleet",
        },
        {
          Component: VehiclePage,
          loader: getVehicleDetails,
          path: "fleet/:id",
        },
        {
          Component: CamPage,
          id: "cam",
          path: "cam/:id",
        },
        {
          Component: Error,
          path: "*",
        },
      ],
      Component: Layout,
      hydrateFallbackElement: <Spinner />,
      path: "/",
    },

    {
      action: loginAction,
      Component: LoginPage,
      path: "/login",
    },
    {
      Component: RegistrationPage,
      path: "/registration",
    },
  ],
  {},
);

const App: React.FC = () => (
  <RosConnection url={`wss://${import.meta.env.APP_ROS_IP}:9090`}>
    <MapProvider>
      <AppProvider>
        <RouterProvider {...{ router }} />
      </AppProvider>
    </MapProvider>
  </RosConnection>
);

export { App };
