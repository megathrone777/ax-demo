import React, { useEffect, useState } from "react";

import { useDestinations, useStore } from "@/hooks";
import type { TDelay } from "@/store";
import { updateDestinationDelay } from "@/store";

import { selectWrapperClass, selectClass, labelClass } from "./Edit.css";

import type { TOption, TProps } from "./Edit.types";

const Edit: React.FC<TProps> = ({ index }) => {
  const { id, positions } = useDestinations();
  const { dispatch } = useStore();

  const [{ delay, pointType, sensorType }, setSelectedOption] = useState<TOption>({
    delay: positions[index]!.properties.delay,
    pointType: "destination",
    sensorType: "none",
  });

  const handleSelectChange = ({
    currentTarget: { name, value },
  }: React.SyntheticEvent<HTMLSelectElement>): void => {
    setSelectedOption((prevOptions: TOption): TOption => {
      return { ...prevOptions, [name]: value };
    });

    dispatch(
      updateDestinationDelay({
        delay: value as TDelay,
        id,
        index,
      }),
    );
  };

  useEffect((): void => {
    setSelectedOption(
      (prevOptions: TOption): TOption => ({
        ...prevOptions,
        delay: positions[index]!.properties.delay,
      }),
    );
  }, []);

  return (
    <>
      <div className={selectWrapperClass}>
        <label
          className={labelClass}
          htmlFor="pointDelay"
        >
          Delay:
        </label>

        <select
          className={selectClass}
          id="pointDelay"
          name="delay"
          onChange={handleSelectChange}
          value={delay}
        >
          <option value="0">none</option>
          <option value="1">1m</option>
          <option value="30">30m</option>
          <option value="60">60m</option>
          <option value="120">120m</option>
        </select>
      </div>

      <div className={selectWrapperClass}>
        <label
          className={labelClass}
          htmlFor="pointType"
        >
          Point type:
        </label>

        <select
          className={selectClass}
          id="pointType"
          name="pointType"
          onChange={handleSelectChange}
          value={pointType}
        >
          <option value="destination">destination</option>
          <option value="checkpoint">checkpoint</option>
        </select>
      </div>

      <div className={selectWrapperClass}>
        <label
          className={labelClass}
          htmlFor="sensorType"
        >
          Activate sensor:
        </label>

        <select
          className={selectClass}
          id="sensorType"
          name="sensorType"
          onChange={handleSelectChange}
          value={sensorType}
        >
          <option value="none">none</option>
          <option value="thermal">thermal</option>
          <option value="360cam">360 cam</option>
          <option value="camera">camera</option>
        </select>
      </div>
    </>
  );
};

export { Edit };
