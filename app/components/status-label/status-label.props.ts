import { PipelandSystemProps } from "../pipeland-system";

export interface StatusLabelProps extends PipelandSystemProps {
  type: "OPEN" | "CLOSED" | "CORRECTED" | string;
}
