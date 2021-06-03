import { ComponentProps } from "../../theme/component-props";
import { DividerPresets } from "./divider.presets";

export interface DividerProps extends ComponentProps {
  preset?: DividerPresets;
}
