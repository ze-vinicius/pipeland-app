import { PipelandSystemProps } from "../pipeland-system";

export interface StatusLabelProps extends PipelandSystemProps {
  type: "opened" | "closed" | "corrected";
}
