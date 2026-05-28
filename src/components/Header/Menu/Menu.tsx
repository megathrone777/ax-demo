import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useResize } from "@/hooks";
import { Burger, Button } from "@/ui";

import { menuItems } from "./data";

import { wrapperClass, listClass, itemClass, burgerWrapperClass } from "./Menu.css";

const Menu: React.FC = () => {
  const isMobileView = useResize(1024);
  const { pathname } = useLocation();
  const [isOpened, toggleOpened] = useState<boolean>(!isMobileView);

  const handleMenuToggle = (): void => {
    toggleOpened(!isOpened);
  };

  const renderMenuItems = (): React.ReactElement[] =>
    menuItems.map(
      ({ children, id, to }): React.ReactElement => (
        <li
          className={itemClass}
          key={id}
        >
          <Button
            size="medium"
            template="tertiary"
            {...{ to }}
          >
            {children}
          </Button>
        </li>
      ),
    );

  useEffect((): void => {
    toggleOpened(false);
  }, [pathname]);

  return (
    <div className={wrapperClass}>
      {menuItems && !!menuItems.length && (
        <ul
          className={listClass}
          style={
            {
              "--list-transform": isOpened ? "scale(1)" : "scale(0)",
              "--list-transition": isMobileView ? "transform 0.1s linear" : "none",
            } as React.CSSProperties
          }
        >
          {renderMenuItems()}
        </ul>
      )}

      <span className={burgerWrapperClass}>
        <Burger
          {...{ isOpened }}
          onClick={handleMenuToggle}
          type="button"
        />
      </span>
    </div>
  );
};

export { Menu };
