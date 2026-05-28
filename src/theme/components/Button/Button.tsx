import React from "react";
import { NavLink } from "react-router-dom";

import { baseClass, sizeClass, templateClass } from "./Button.css";

import type { TProps } from "./Button.types";

const Button: React.FC<TProps> = ({
  children,
  id,
  isActive,
  onClick,
  size,
  template = "primary",
  to,
  type,
  value,
}) => {
  const className = `${baseClass} ${sizeClass[size]} ${templateClass[template]} ${isActive ? "active" : ""}`;

  return to ? (
    <NavLink {...{ className, to }}>{children}</NavLink>
  ) : (
    <button {...{ className, id, onClick, type, value }}>{children}</button>
  );
};

export { Button };
