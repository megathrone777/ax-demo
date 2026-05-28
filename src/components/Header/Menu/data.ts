import type { LinkProps } from "react-router-dom";

export const menuItems: LinkProps[] = [
  {
    children: "map",
    id: "nav-link-1",
    to: "/map/1",
  },
  {
    children: "fleet",
    id: "nav-link-2",
    to: "/fleet",
  },
  {
    children: "alerts",
    id: "nav-link-3",
    to: "/alerts",
  },
];
