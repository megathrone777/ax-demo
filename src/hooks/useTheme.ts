import { colors, devices, fonts, easing } from "@/theme/variables";

import type { TUseTheme } from "./types";

const theme = { colors, devices, easing, fonts };

const useTheme: TUseTheme = () => theme;

export { useTheme };
