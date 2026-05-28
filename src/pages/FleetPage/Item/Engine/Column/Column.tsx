import React from "react";

import {
  contentClass,
  headingClass,
  labelClass,
  titleLabelClass,
  titleValueClass,
  valueClass,
  wrapperClass,
} from "./Column.css";

import type { TProps } from "./Column.types";

const Column: React.FC<TProps> = ({ label, title, value }) => (
  <div className={wrapperClass}>
    <div className={headingClass}>
      <p className={titleLabelClass}>{title.label}:</p>
      <p className={titleValueClass}>{title.value}</p>
    </div>

    <div className={contentClass}>
      <p className={labelClass}>{label}</p>
      <p className={valueClass}>{value}</p>
    </div>
  </div>
);

export { Column };
