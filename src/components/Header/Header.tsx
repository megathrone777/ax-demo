import React, { useEffect } from "react";
import { useMatch } from "react-router";
import { useSubscription } from "rosreact";

import { topics } from "@/ros";

import { Logo } from "./Logo";
import { Menu } from "./Menu";
import { Search } from "./Search";
import { User } from "./User";

import { wrapperClass } from "./Header.css";

const Header: React.FC = () => {
  const gpsData = useSubscription(topics.GPS);
  const match = useMatch({
    end: false,
    path: "map",
  });

  useEffect((): void => {
    console.log(gpsData);
  }, [gpsData]);

  return (
    <div className={wrapperClass}>
      <Logo />
      <Menu />
      {match && <Search />}
      <User />
    </div>
  );
};

export { Header };
