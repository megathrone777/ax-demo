import React from "react";
import { NavLink } from "react-router-dom";

import { wrapperClass, linkClass, imageClass } from "./Logo.css";

const Logo: React.FC = () => (
  <div className={wrapperClass}>
    <NavLink
      className={linkClass}
      to="/"
    >
      <img
        alt="Logo image."
        className={imageClass}
        src="images/logo_img.png"
      />
    </NavLink>
  </div>
);

export { Logo };
