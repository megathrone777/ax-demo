import React from "react";

import { viewBoxMap } from "./viewBoxMap";

import type { TProps } from "./Icon.types";

const Icon: React.FC<TProps> = ({ className, id }) => (
  <svg
    className={`
      max-h-full
      ${className && className.length > 0 ? className : ""}
    `}
    preserveAspectRatio="xMidYMid meet"
    viewBox={viewBoxMap[id]}
  >
    <use href={`images/sprite.svg#${id}Icon`} />
  </svg>
);

export { Icon };
