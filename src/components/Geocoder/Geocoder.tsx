import React, { useState } from "react";
import center from "@turf/center";
import { points } from "@turf/helpers";

import { useDebouncedCallback } from "@/hooks";
import { Icon, Input, Spinner } from "@/ui";

import { wrapperClass, loaderWrapperClass, clearClass } from "./Geocoder.css";

import type { Feature } from "geojson";
import type { TProps } from "./Geocoder.types";

const Geocoder: React.FC<TProps> = ({ onClear, onResults, placeholder }) => {
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const getResults = useDebouncedCallback(async (query: string): Promise<void> => {
    const response: Response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=geojson&polygon_geojson=1&addressdetails=1`,
    );
    const geojson: { features: Feature[] } = await response.json();
    const suggestions: TSuggestion[] = geojson.features.map(
      ({ bbox, properties }: Feature): TSuggestion => {
        const suggestion: TSuggestion = {
          center: [],
          id: 0,
          title: "",
        };

        if (bbox && properties) {
          suggestion.center = center(points([bbox])).geometry.coordinates;
          suggestion.id = properties.osm_id;
          suggestion.title = properties.display_name;
        }

        return suggestion;
      },
    );

    onResults(suggestions);
    toggleLoading(false);
  }, 500);

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    const { value } = currentTarget;

    setInputValue(value);
    getResults(value);
    toggleLoading(true);
  };

  const handleClearClick = (): void => {
    setInputValue("");
    onClear();
  };

  return (
    <div className={wrapperClass}>
      <Input
        onChange={handleInputChange}
        template="secondary"
        type="text"
        value={inputValue}
        {...{ placeholder }}
      />

      {isLoading && (
        <div className={loaderWrapperClass}>
          <Spinner template="small" />
        </div>
      )}

      {!isLoading && inputValue.length > 0 && (
        <button
          className={clearClass}
          onClick={handleClearClick}
          type="button"
        >
          <Icon id="close" />
        </button>
      )}
    </div>
  );
};

export { Geocoder };
