import { ComponentBaseProps } from "../component-base";
import { ButtonPresets } from "./button.presets";

interface ButtonProps extends ComponentBaseProps {
  preset?: ButtonPresets;
  isLoading?: boolean;
  onPress(): void;
}

export { ButtonProps };
