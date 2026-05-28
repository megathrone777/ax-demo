import React from "react";

import { Button } from "@/ui";

import { wrapperClass, textClass } from "./Error.css";

const Error: React.FC = () => (
  <div className={wrapperClass}>
    <h1 className={textClass}>Page not found</h1>

    <Button
      size="medium"
      template="primary"
      to="/map"
    >
      Map page
    </Button>
  </div>
);

export { Error };
