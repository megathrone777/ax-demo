import React from "react";
import { useMatch } from "react-router-dom";

import { Logo } from "./Logo";
import { Menu } from "./Menu";
import { Search } from "./Search";
import { User } from "./User";

import { wrapperClass } from "./Header.css";

const Header: React.FC = () => {
  const match = useMatch({
    end: false,
    path: "map",
  });

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
