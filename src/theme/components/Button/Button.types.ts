import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { LinkProps } from "react-router-dom";

export interface TProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  isActive?: boolean;
  size: "large" | "medium" | "small";
  template: "primary" | "secondary" | "tertiary";
  to?: LinkProps["to"];
}
