import React from "react";
import { NavLink, useParams } from "react-router";
import { useRos } from "rosreact";

import { useAppContext } from "@/hooks";

import {
  wrapperClass,
  headingClass,
  contentClass,
  controlClass,
  linkClass,
  mediaClass,
  imageHolderClass,
  imageClass,
} from "./Details.css";

const Details: React.FC = () => {
  const ros = useRos();
  const { id } = useParams();
  const { store } = useAppContext();

  const connectionStatus = ros.isConnected ? "connected" : "disconnected";

  const renderDetails = (): React.ReactElement | React.ReactElement[] => {
    if (id === "1") {
      return (
        <>
          <div className={controlClass[connectionStatus]}>
            <div className={contentClass}>
              {/* <p>ID: {id}</p> */}
              <p>IP: {store.currentIP}</p>
            </div>

            <NavLink
              className={linkClass}
              to={`/cam/${id}`}
            >
              Take control
            </NavLink>
          </div>

          <div className={mediaClass}>
            <span className={imageHolderClass}>
              <img
                alt="Vehicle"
                className={imageClass}
                src="images/fleet_img.jpg"
              />
            </span>
            ugv id: {id}
          </div>
        </>
      );
    }

    return (
      <div className={controlClass[connectionStatus]}>
        <div className={headingClass}>
          <span className={imageHolderClass}>
            <img
              alt="Vehicle image."
              className={imageClass}
              src="images/fleet_img.jpg"
            />
          </span>

          <div className={contentClass}>
            {/* <p>ID: 1</p> */}
            <p>IP: {store.currentIP}</p>
          </div>
        </div>

        <NavLink
          className={linkClass}
          to={`/cam/${id}`}
        >
          Take control
        </NavLink>
      </div>
    );
  };

  return <div className={wrapperClass}>{renderDetails()}</div>;
};

export { Details };
