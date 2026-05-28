import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMap } from "@vis.gl/react-maplibre";

import { Burger, Button } from "@/ui";

import { Boundaries } from "./Boundaries";
import { Details } from "./Details";
import { Mission } from "./Mission";
import { Stats } from "./Stats";

import { wrapperClass, layoutClass, burgerWrapperClass, tabsWrapperClass } from "./Sidebar.css";

import type { TTabKey } from "./Sidebar.types";

const Sidebar: React.FC = () => {
  const { id } = useParams();
  const { mainMap } = useMap();
  const [activeTab, toggleActiveTab] = useState<TTabKey>("mission");
  const [isOpened, toggleOpened] = useState<boolean>(true);

  const handleSidebarToggle = (): void => {
    toggleOpened(!isOpened);
  };

  const handleTabToggle = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    toggleActiveTab(currentTarget.value as TTabKey);
  };

  const handleTransitionEnd = ({
    currentTarget,
    target,
  }: React.SyntheticEvent<HTMLDivElement>): void => {
    if (currentTarget === target && mainMap) {
      mainMap.resize();
      mainMap.triggerRepaint();
    }
  };

  return (
    <div
      className={wrapperClass}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={burgerWrapperClass}>
        <Burger
          isOpened={!isOpened}
          onClick={handleSidebarToggle}
          type="button"
        />
      </div>

      <div className={layoutClass}>
        <Details />

        {id && (
          <>
            <div className={tabsWrapperClass}>
              <Button
                isActive={activeTab === "mission"}
                onClick={handleTabToggle}
                size="small"
                template="primary"
                value="mission"
              >
                Mission
              </Button>

              <Button
                isActive={activeTab === "boundaries"}
                onClick={handleTabToggle}
                size="small"
                template="primary"
                value="boundaries"
              >
                Boundaries
              </Button>
            </div>

            {activeTab === "mission" ? (
              <>
                <Stats />
                <Mission />
              </>
            ) : (
              <Boundaries />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { Sidebar };
