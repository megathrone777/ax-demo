import React from "react";

import { items } from "./data";
import { Item } from "./Item";

import { listClass } from "./AlertsPage.css";

import type { TAlert } from "./Item/Item.types";

const AlertsPage: React.FC = () => (
  <div className={listClass}>
    {items.map<React.ReactElement>((alertItem: TAlert) => (
      <Item
        key={`${alertItem.time}-alert`}
        {...alertItem}
      />
    ))}
  </div>
);

export { AlertsPage };
