import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Geocoder } from "@/components";
import { useMapLocate, useStore } from "@/hooks";
import { setArea } from "@/store";

import { wrapperClass, listClass, itemClass } from "./Search.css";

import type { Position } from "geojson";

const Search: React.FC = () => {
  const [suggestions, setSuggestions] = useState<TSuggestion[]>([]);
  const locatePoint = useMapLocate("mainMap");
  const navigate = useNavigate();
  const { dispatch } = useStore();

  const handleResults = (suggestions: TSuggestion[]): void => {
    setSuggestions(suggestions);
  };

  const handleResultsClear = (): void => {
    dispatch(setArea([]));
    navigate("/map", { replace: true });
    setSuggestions([]);
  };

  const handleSuggestionClick = (center: Position): void => {
    navigate("/map", { replace: true });
    setSuggestions([]);
    dispatch(setArea(center));
    locatePoint([center[0]!, center[1]!], 10);
  };

  return (
    <div className={wrapperClass}>
      <Geocoder
        onClear={handleResultsClear}
        onResults={handleResults}
        placeholder="Search location"
      />

      {!!suggestions.length && (
        <ul className={listClass}>
          {suggestions.map<React.ReactElement>(({ center, id, title }: TSuggestion) => (
            <li
              className={itemClass}
              key={`${id}-suggestion`}
              onClick={(): void => handleSuggestionClick(center)}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Search };
