import { colors, devices, fonts, easing } from "@/theme/variables";

const theme = { colors, devices, easing, fonts };

const useTheme = (): typeof theme => theme;

export { useTheme };
