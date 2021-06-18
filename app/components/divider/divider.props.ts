import { PipelandSystemProps } from "../pipeland-system";
import { DividerPresets } from "./divider.presets";

export interface DividerProps extends PipelandSystemProps {
  preset?: DividerPresets;
}
