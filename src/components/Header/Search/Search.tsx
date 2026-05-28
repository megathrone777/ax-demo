import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Geocoder } from "@/components";
import { useAppContext, useMapLocate } from "@/hooks";

import { wrapperClass, listClass, itemClass } from "./Search.css";

import type { Position } from "geojson";

const Search: React.FC = () => {
  const { actions } = useAppContext();
  const [suggestions, setSuggestions] = useState<TSuggestion[]>([]);
  const locatePoint = useMapLocate("mainMap");
  const navigate = useNavigate();

  const handleResults = (suggestions: TSuggestion[]): void => {
    setSuggestions(suggestions);
  };

  const handleResultsClear = (): void => {
    actions.setArea([]);
    navigate("/map", { replace: true });
    setSuggestions([]);
  };

  const handleSuggestionClick = (center: Position): void => {
    navigate("/map", { replace: true });
    setSuggestions([]);
    actions.setArea(center);
    locatePoint([center[0], center[1]], 10);
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
