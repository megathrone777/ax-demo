import type { LoaderFunction } from "react-router-dom";

const getVehicles: LoaderFunction = async () => {
  const response = await fetch("/fleet.json");
  const vehicles = (await response.json()) as TVehicle[];

  return {
    vehicles,
  };
};

const getVehicleDetails: LoaderFunction = async ({ params }) => {
  const response = await fetch("/fleet.json");
  const vehicles = (await response.json()) as TVehicle[];

  return vehicles.find(({ id }): boolean => `${id}` === params.id) ?? null;
};

export { getVehicleDetails, getVehicles };
