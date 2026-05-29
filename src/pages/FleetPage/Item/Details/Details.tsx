import React, { useState } from "react";
import { useRos, closeConnection } from "rosreact";

import { useAppContext } from "@/hooks";
import { Input } from "@/ui";

import {
  wrapperClass,
  tableClass,
  rowClass,
  theadClass,
  theadCellClass,
  cellClass,
  idClass,
  ipErrorClass,
} from "./Details.css";

import type { TProps } from "./Details.types";

const Details: React.FC<TProps> = ({ id, position: { latitude, longitude } }) => {
  const ros = useRos();
  const { actions, store } = useAppContext();
  const [ipAddress, setIPAddress] = useState<string>(store.currentIP);
  const [ipAddressError, setIpAddressError] = useState<boolean>(false);

  const handleIpAddressChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const { value } = currentTarget;
    const pattern = new RegExp(
      /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    );

    setIPAddress(value);

    if (!value.match(pattern)) {
      setIpAddressError(true);

      return;
    }

    setIpAddressError(false);
  };

  const handleIpAddressSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    closeConnection(ros);
    actions.setCurrentIP(ipAddress);
  };

  return (
    <div className={wrapperClass}>
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
              LAT: {latitude.toFixed(4)}
              <br />
              LON: {longitude.toFixed(4)}
              <br />
              ALT: 12.345
            </td>
          </tr>

          <tr className={rowClass}>
            <td className={cellClass}>network</td>

            <td className={cellClass}>
              <form
                action="#"
                onSubmit={handleIpAddressSubmit}
              >
                <Input
                  onChange={handleIpAddressChange}
                  template="invisible"
                  type="text"
                  value={ipAddress}
                />

                {ipAddressError && <span className={ipErrorClass}>Wrong format</span>}
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { Details };
