import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDestinations, useStore } from "@/hooks";
import { addDestination } from "@/store";
import { Button, Input } from "@/ui";

import { UploadWaypoints } from "./UploadWaypoints";

import { formClass, layoutClass, infoClass } from "./Create.css";

const Create: React.FC = () => {
  const { name, positions } = useDestinations();
  const { id } = useParams();
  const [missionName, setMissionName] = useState<string>("");
  const { dispatch } = useStore();

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setMissionName(currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (missionName.length === 0) {
      return;
    }

    dispatch(
      addDestination({
        id: +id!,
        name: missionName,
        positions: [],
        waypoints: [],
      }),
    );
  };

  useEffect((): void => {
    if (name && name.length > 0) {
      setMissionName(name);

      return;
    }

    setMissionName("");
  }, [name]);

  return (
    <div>
      <form
        action="#"
        className={formClass}
        method="POST"
        onSubmit={handleSubmit}
      >
        <Input
          name="missionName"
          onChange={handleInputChange}
          placeholder="Create mission"
          template="invisible"
          type="text"
          value={missionName}
        />

        {name.length === 0 && (
          <Button
            size="small"
            template="tertiary"
            type="submit"
          >
            Create
          </Button>
        )}
      </form>

      <div className={layoutClass}>
        {name.length > 0 && <UploadWaypoints />}

        {positions.length === 0 && name.length > 0 && (
          <p className={infoClass}>Click on map or upload file to add waypoints.</p>
        )}
      </div>
    </div>
  );
};

export { Create };
