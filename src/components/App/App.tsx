import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MapProvider } from "@vis.gl/react-maplibre";

import { getVehicles, getVehicleDetails, loginAction } from "@/api";
import { Error, Layout } from "@/components";
import {
  AlertsPage,
  CamPage,
  FleetPage,
  LoginPage,
  MapPage,
  RegistrationPage,
  VehiclePage,
} from "@/pages";
import { AppProvider } from "@/store";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      children: [
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
          index: true,
          loader: getVehicles,
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
  ]);

  return (
    <MapProvider>
      <AppProvider>
        <RouterProvider {...{ router }} />
      </AppProvider>
    </MapProvider>
  );
};

export { App };
