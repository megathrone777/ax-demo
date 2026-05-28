import React, { useEffect, useState } from "react";
import { useOutlet } from "react-router";
import { RosConnection } from "rosreact";

import { Header } from "@/components";

import { contentClass } from "./Layout.css";

const Layout: React.FC = () => {
  const outlet = useOutlet();
  const [, setRosContextReady] = useState(false);

  useEffect((): void => {
    setRosContextReady(true);
  }, []);

  return (
    <RosConnection
      autoConnect
      autoConnectTimeout={1000}
      url={`${location.protocol.includes("https") ? "wss" : "ws"}://${import.meta.env.APP_ROS_IP}:9090`}
    >
      <Header />
      <main className={contentClass}>{outlet}</main>
    </RosConnection>
  );
};

export { Layout };
