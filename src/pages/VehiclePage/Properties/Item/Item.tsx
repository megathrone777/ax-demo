import React, { useState } from "react";

import { Input } from "@/ui";

import { rowClass, cellClass } from "./Item.css";

import type { TProps } from "./types";

const Item: React.FC<TProps> = ({ name, value }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setInputValue(currentTarget.value);
  };

  return (
    <tr className={rowClass}>
      <td className={cellClass}>{name.replaceAll("_", " ")}</td>

      <td className={cellClass}>
        <Input
          onChange={handleInputChange}
          template="invisible"
          type="text"
          value={inputValue}
          {...{ name }}
        />
      </td>
    </tr>
  );
};

export { Item };
