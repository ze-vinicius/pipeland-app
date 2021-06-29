import { palette } from "./palette";

export const color = {
  ...palette,
  primary: palette.green,
  secondary: palette.blue,
  background: palette.white,
  text: palette.black,
  textSecondary: palette.lightGrey,
  line: palette.offWhite,
  dim: palette.lighterGrey,
  error: palette.red,
  info: palette.blue,
  alert: palette.yellow,
};

export type ColorType = keyof typeof color;
