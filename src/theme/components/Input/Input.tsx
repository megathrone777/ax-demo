import React from "react";

import { inputClass } from "./Input.css";

import type { TProps } from "./Input.types";

const Input: React.FC<TProps> = ({
  autoFocus,
  name,
  onChange,
  pattern,
  placeholder,
  template = "primary",
  type,
  value,
}) => (
  <input
    autoComplete="off"
    className={inputClass[template]}
    {...{ autoFocus, name, onChange, pattern, placeholder, type, value }}
  />
);

export { Input };
