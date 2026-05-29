import React from "react";

import { Button } from "@/ui";

import { vehicleProps } from "./data";
import { Item } from "./Item";

import {
  wrapperClass,
  tableClass,
  rowClass,
  cellClass,
  theadClass,
  theadCellClass,
  tfootCellClass,
  idClass,
} from "./Properties.css";

import type { TProps } from "./Properties.types";

const Properties: React.FC<TProps> = ({ id, ipAddres, position }) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const data: Record<string, FormDataEntryValue> = {};

    for (const key of formData.keys()) {
      const value = formData.get(key)!;

      data[key] = value;
    }
  };

  return (
    <form
      action="#"
      className={wrapperClass}
      method="POST"
      onSubmit={handleSubmit}
    >
      <table className={tableClass}>
        <thead className={theadClass}>
          <tr className={rowClass}>
            <th
              className={theadCellClass}
              colSpan={2}
            >
              vehicle id: <span className={idClass}>{id}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className={rowClass}>
            <td className={cellClass}>current position</td>

            <td className={cellClass}>
              LAT: {position.latitude.toFixed(4)}
              <br />
              LON: {position.longitude.toFixed(4)}
              <br />
              ALT: 12.345
            </td>
          </tr>

          <tr className={rowClass}>
            <td className={cellClass}>network</td>
            <td className={cellClass}>{ipAddres}</td>
          </tr>

          {Object.entries(vehicleProps).map<React.ReactElement>(([name, value]) => (
            <Item
              key={`vehicle-props-${name}`}
              {...{ name, value }}
            />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td className={tfootCellClass}>
              <Button
                size="large"
                template="primary"
                type="submit"
              >
                Update
              </Button>
            </td>

            <td className={tfootCellClass} />
          </tr>
        </tfoot>
      </table>
    </form>
  );
};

export { Properties };
