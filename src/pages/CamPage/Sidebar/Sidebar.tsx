import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import { useMap } from "@vis.gl/react-maplibre";

import { useResize } from "@/hooks";
import { Button, Burger } from "@/ui";

import { Actions } from "./Actions";
import { AutoPilot } from "./AutoPilot";
import { actionsList, actionsList2 } from "./data";

import {
  wrapperClass,
  headingClass,
  layoutClass,
  arrowsIconClass,
  burgerWrapperClass,
} from "./Sidebar.css";

import type { TProps } from "./Sidebar.types";

const Sidebar: React.FC<TProps> = ({ onCollapse }) => {
  const { id } = useParams();
  const isMobileView = useResize(768);
  const [isOpened, toggleOpened] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<null | number>(null);
  const [touchEnd, setTouchEnd] = useState<null | number>(null);
  const { controlsMap } = useMap();

  const handleToggleClick = useCallback((): void => {
    onCollapse();
    toggleOpened(!isOpened);
  }, [isOpened]);

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

    if (distance < -20) {
      toggleOpened(false);
      onCollapse();
    }
  };

  const handleTransitionEnd = ({
    currentTarget,
    target,
  }: React.SyntheticEvent<HTMLDivElement>): void => {
    if (isMobileView) return;
    if (currentTarget === target && controlsMap) {
      controlsMap.resize();
      controlsMap.triggerRepaint();
    }
  };

  return (
    <div
      className={wrapperClass}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTransitionEnd={handleTransitionEnd}
      style={
        {
          "--sidebar-x": isOpened ? "0px" : "400px",
          "--sidebar-x-sm": isOpened ? "0px" : "300px",
        } as React.CSSProperties
      }
    >
      <div className={headingClass}>
        <div className={burgerWrapperClass}>
          <Burger
            onClick={handleToggleClick}
            {...{ isOpened }}
          />
        </div>

        <svg className={arrowsIconClass}>
          <use xlinkHref="images/sprite.svg#anglesIcon" />
        </svg>
      </div>

      <div className={layoutClass}>
        <Actions
          list={actionsList}
          title="actions"
        />
        <Actions
          list={actionsList2}
          title="mode"
        />
        <AutoPilot />

        <Button
          size="large"
          template="primary"
          to={`/map/${id}`}
          type="button"
        >
          return to home
        </Button>
      </div>
    </div>
  );
};

export { Sidebar };
