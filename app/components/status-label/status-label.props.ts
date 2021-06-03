import { ComponentProps } from "../../theme/component-props";

export interface StatusLabelProps extends ComponentProps {
  type: "opened" | "closed" | "corrected";
}
