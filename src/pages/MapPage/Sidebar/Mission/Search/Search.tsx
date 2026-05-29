import React, { useCallback, useEffect, useState } from "react";

import { useDestination, useMapLocate } from "@/hooks";
import { Icon, Input } from "@/ui";

import { layoutClass, resultsClass, listClass, itemClass, clearClass } from "./Search.css";

import type { Position } from "geojson";

const Search: React.FC = () => {
  const { positions } = useDestination();
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<TSuggestion[]>([]);
  const locatePoint = useMapLocate("mainMap");

  const handleSuggestionClick = useCallback(
    (center: Position): void => {
      locatePoint(center);
    },
    [suggestions],
  );

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setInputValue(currentTarget.value);
  };

  const handleResultsClear = (): void => {
    setInputValue("");
  };

  useEffect((): void => {
    if (inputValue.length > 0) {
      const newSuggestions = positions
        .filter(({ properties: { name } }) => name.includes(inputValue))
        .map(
          ({ geometry: { coordinates }, id, properties: { name } }): TSuggestion => ({
            center: coordinates,
            id: +id!,
            title: name,
          }),
        );

      setSuggestions(newSuggestions);

      return;
    }

    setSuggestions([]);
  }, [inputValue]);

  return (
    <div>
      <div className={layoutClass}>
        <Input
          onChange={handleInputChange}
          placeholder="Search location..."
          template="secondary"
          type="text"
          value={inputValue}
        />

        {inputValue.length > 0 && (
          <button
            className={clearClass}
            onClick={handleResultsClear}
            type="button"
          >
            <Icon id="close" />
          </button>
        )}
      </div>

      {!!suggestions.length && (
        <div className={resultsClass}>
          <ul className={listClass}>
            {suggestions.map<React.ReactElement>(({ center, id, title }: TSuggestion) => (
              <li
                className={itemClass}
                key={`${id}-suggestion-mission`}
                onClick={(): void => handleSuggestionClick(center)}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Search };
