import { ComponentBaseProps } from "../component-base";

export interface StatusLabelProps extends ComponentBaseProps {
  type: "opened" | "closed" | "corrected";
}
