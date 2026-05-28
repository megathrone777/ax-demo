import React, { useState } from "react";

import { useDestinations, useStore } from "@/hooks";
import { updateDestinationName } from "@/store";
import { Input } from "@/ui";

import type { TProps } from "./Save.types";

const Save: React.FC<TProps> = ({ index, onSave }) => {
  const [name, setName] = useState<string>("");
  const { id, positions } = useDestinations();
  const { dispatch } = useStore();

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setName(currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(
      updateDestinationName({
        id,
        index,
        name,
      }),
    );
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
