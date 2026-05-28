import React, { useState } from "react";

import { Icon } from "@/ui";

import {
  wrapperClass,
  buttonClass,
  buttonIconActiveClass,
  buttonIconInactiveClass,
} from "./Emergency.css";

const Emergency: React.FC = () => {
  const [isActive, toggleActive] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<null | number>(null);
  const [touchEnd, setTouchEnd] = useState<null | number>(null);

  const handleTouchStart = ({ targetTouches }: React.TouchEvent): void => {
    setTouchEnd(null);
    setTouchStart(targetTouches[0]?.clientX ?? null);
  };

  const handleTouchMove = ({ targetTouches }: React.TouchEvent): void => {
    setTouchEnd(targetTouches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    if (distance < -50) {
      toggleActive(true);

      return;
    }

    toggleActive(false);
  };

  return (
    <div className={wrapperClass}>
      <button
        className={buttonClass[isActive ? "active" : "inactive"]}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        type="button"
      >
        <span>emergency stop</span>

        <Icon
          className={isActive ? buttonIconActiveClass : buttonIconInactiveClass}
          id="angles"
        />
      </button>
    </div>
  );
};

export { Emergency };
