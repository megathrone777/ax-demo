import React, { useState } from "react";

import { Stream } from "@/components";

import { wrapperClass, holderClass } from "./StreamToggle.css";

const StreamToggle: React.FC = () => {
  const [isFront, toggleDirection] = useState<boolean>(true);

  const handleDirectionToggle = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLDivElement>): void => {
    if (currentTarget.classList.contains("is-collapsed")) {
      toggleDirection(!isFront);
    }
  };

  return (
    <div className={wrapperClass}>
      <div
        className={`${holderClass}${isFront ? " is-collapsed" : ""}`}
        onClick={handleDirectionToggle}
      >
        <Stream
          direction="reverse"
          showControls={false}
        />
      </div>

      <div
        className={`${holderClass}${isFront ? "" : " is-collapsed"}`}
        onClick={handleDirectionToggle}
      >
        <Stream
          direction="front"
          showControls={false}
        />
      </div>
    </div>
  );
};

export { StreamToggle };
