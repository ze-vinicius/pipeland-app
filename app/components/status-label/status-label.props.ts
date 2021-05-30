import { BaseComponentInterface } from "../../theme/BaseComponentInterface";

export interface StatusLabelProps extends BaseComponentInterface {
  type: "opened" | "closed" | "corrected";
}
