import React from "react";
import { useNavigate } from "react-router";

import { Button } from "@/ui";

import { wrapperClass, nameClass } from "./User.css";

const User: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username");

  const handleLogout = (): void => {
    localStorage.removeItem("username");
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className={wrapperClass}>
      {currentUser && <span className={nameClass}>User: {currentUser}</span>}

      <Button
        onClick={handleLogout}
        size="medium"
        template="secondary"
        type="button"
      >
        Logout
      </Button>
    </div>
  );
};

export { User };
