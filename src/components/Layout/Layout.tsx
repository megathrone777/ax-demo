import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";
import { RosConnection } from "rosreact";

import { Header } from "@/components";

import { contentClass } from "./Layout.css";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const [, setRosContextReady] = useState(false);

  useEffect((): void => {
    if (!localStorage.getItem("username")) {
      navigate("/login", {
        replace: true,
      });

      return;
    }
  }, [pathname]);

  useEffect((): void => {
    setRosContextReady(true);
  }, []);

  return (
    <RosConnection
      autoConnect
      autoConnectTimeout={1000}
      url={`ws://${import.meta.env.APP_ROS_IP}:9090`}
    >
      <Header />
      <main className={contentClass}>{outlet}</main>
    </RosConnection>
  );
};

export { Layout };
