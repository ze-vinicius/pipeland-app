import { BaseComponentInterface } from "../../theme/BaseComponentInterface";
import { DividerPresets } from "./divider.presets";

export interface DividerProps extends BaseComponentInterface {
  preset?: DividerPresets;
}
