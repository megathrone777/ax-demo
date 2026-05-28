import React, { useState } from "react";

import { useResize } from "@/hooks";

import { Controls } from "./Controls";
import { Coords } from "./Coords";
import { Emergency } from "./Emergency";
import { Map } from "./Map";
import { Mode } from "./Mode";
import { Sidebar } from "./Sidebar";
import { Stats } from "./Stats";
import { StreamToggle } from "./StreamToggle";

import { wrapperClass, layoutClass, columnClass } from "./CamPage.css";

const CamPage: React.FC = () => {
  const isMobileView = useResize(768);
  const [sidebarIsCollapsed, toggleSidebarCollapsed] = useState<boolean>(true);

  const handleSidebarCollapse = (): void => {
    toggleSidebarCollapsed(!sidebarIsCollapsed);
  };

  return (
    <div className={wrapperClass}>
      <div
        className={layoutClass}
        style={
          {
            "--layout-width": !sidebarIsCollapsed ? "calc(100% - 400px)" : "100%",
            "--layout-width-sm": !sidebarIsCollapsed ? "calc(100% - 300px)" : "100%",
          } as React.CSSProperties
        }
      >
        <div className={columnClass}>
          <Coords />
          <Emergency />
        </div>

        {!isMobileView && <Map />}
        <Stats />
        <Mode />
        <Controls />
        <StreamToggle />
      </div>

      <Sidebar onCollapse={handleSidebarCollapse} />
    </div>
  );
};

export { CamPage };
