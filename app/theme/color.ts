import { palette } from "./palette";

export const color = {
  primary: palette.lightGrey,
  background: palette.white,
  text: palette.black,
  line: palette.offWhite,
  dim: palette.lighterGrey,
  error: palette.red,
};

export type ColorType = keyof typeof color;
