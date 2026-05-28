import React, { useState } from "react";

import { useDestination, useAppContext } from "@/hooks";
import { Input } from "@/ui";

import type { TProps } from "./Save.types";

const Save: React.FC<TProps> = ({ index, onSave }) => {
  const [name, setName] = useState<string>("");
  const { id, positions } = useDestination();
  const { actions } = useAppContext();

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setName(currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    actions.updateDestinationName({
      id,
      index,
      name,
    });
    onSave();
  };

  return (
    <form
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <Input
        autoFocus
        defaultValue={positions[index]!.properties!.name}
        onChange={handleInputChange}
        placeholder="Enter destination name..."
        template="secondary"
        type="text"
        value={name}
      />
    </form>
  );
};

export { Save };
