import { ComponentBaseProps } from "../component-base";
import { DividerPresets } from "./divider.presets";

export interface DividerProps extends ComponentBaseProps {
  preset?: DividerPresets;
}
