import React, { useEffect } from "react";
import { useOutlet } from "react-router";
import { useRos } from "rosreact";

import { Header } from "@/components";

import { contentClass } from "./Layout.css";

const Layout: React.FC = () => {
  const ros = useRos();
  const outlet = useOutlet();

  useEffect((): void => {
    console.log(ros);
    // ros.transportOptions
    if (!ros.isConnected) {
      ros.connect(`wss://${import.meta.env.APP_ROS_IP}:9090`);
    }
  }, [ros.isConnected]);

  return (
    <>
      <Header />
      <main className={contentClass}>{outlet}</main>
    </>
  );
};

export { Layout };
