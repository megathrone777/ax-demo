import React, { useState } from "react";

import { Button } from "@/ui";

import { wrapperClass } from "./AutoPilot.css";

const AutoPilot: React.FC = () => {
  const [isEnabled, toggleEnabled] = useState<boolean>(false);

  const handleToggleClick = (): void => {
    toggleEnabled(!isEnabled);
  };

  return (
    <div className={wrapperClass}>
      <Button
        isActive={isEnabled}
        onClick={handleToggleClick}
        size="large"
        template="primary"
        type="button"
      >
        engage autopilot
      </Button>
    </div>
  );
};

export { AutoPilot };
