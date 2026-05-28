import React, { useState } from "react";

import { Button } from "@/ui";

import { wrapperClass } from "./Mode.css";

import type { TDirection } from "./Mode.types";

const Mode: React.FC = () => {
  const [direction, setDirection] = useState<TDirection>("forward");

  const handleDirectionToggle = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const { textContent } = currentTarget;

    setDirection(textContent as TDirection);
  };

  return (
    <div className={wrapperClass}>
      <Button
        data-direction="forward"
        isActive={direction === "forward"}
        onClick={handleDirectionToggle}
        size="large"
        template="primary"
        type="button"
      >
        forward
      </Button>

      <Button
        data-direction="reverse"
        isActive={direction === "reverse"}
        onClick={handleDirectionToggle}
        size="large"
        template="primary"
        type="button"
      >
        reverse
      </Button>
    </div>
  );
};

export { Mode };
