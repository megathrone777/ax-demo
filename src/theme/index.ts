import {
  globalStyle as vanillaGlobalStyle,
  style,
  styleVariants,
  type ComplexStyleRule,
} from "@vanilla-extract/css";

import { devices } from "./variables";

import { vars } from "./theme.css";

import type { CssVariant, GlobalStyleArg, StyleArg, ThemeVars } from "./theme.types";

const themeVars: ThemeVars = { ...vars, devices };

const resolveStyle = (styleArg: StyleArg, themeVars: ThemeVars): string =>
  style(typeof styleArg === "function" ? styleArg(themeVars) : styleArg);

const css = (arg: StyleArg): string => resolveStyle(arg, themeVars);

const globalStyle = (selector: string, rule: GlobalStyleArg): void => {
  vanillaGlobalStyle(selector, typeof rule === "function" ? rule(themeVars) : rule);
};

const cssVariant: CssVariant = ((variantMap: unknown, mapFn: unknown): unknown => {
  const resolvedMap = (
    typeof variantMap === "function"
      ? (variantMap as (t: ThemeVars) => Record<string, unknown>)(themeVars)
      : variantMap
  ) as Record<string, ComplexStyleRule | string>;
  const fn = mapFn as (value: unknown, themeVars: ThemeVars) => ComplexStyleRule;

  return styleVariants(resolvedMap, (value) => fn(value, themeVars));
}) as CssVariant;

export { css, cssVariant, globalStyle, type ThemeVars };
