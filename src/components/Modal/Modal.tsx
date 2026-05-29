import React, { useEffect } from "react";

import { useDestination } from "@/hooks";
import { Icon } from "@/ui";

import { layoutClass, overlayClass, headingClass, closeClass } from "./Modal.css";

import type { TProps } from "./Modal.types";

const Modal: React.FC<TProps> = ({ children, onClose }) => {
  const { id } = useDestination();

  const handleEscPress = ({ key }: KeyboardEvent): void => {
    if (key === "Escape") {
      onClose();
    }
  };

  useEffect((): VoidFunction => {
    document.addEventListener("keydown", handleEscPress, false);

    return (): void => {
      document.removeEventListener("keydown", handleEscPress, false);
    };
  }, []);

  return (
    <>
      <div className={layoutClass}>
        <div className={headingClass}>
          ID: {id}
          <button
            className={closeClass}
            onClick={onClose}
            type="button"
          >
            <Icon id="close" />
          </button>
        </div>

        <div>{children}</div>
      </div>

      <div
        className={overlayClass}
        onClick={onClose}
      />
    </>
  );
};

export { Modal };
