import { PipelandSystemProps } from "../pipeland-system";
import { ButtonPresets } from "./button.presets";

interface ButtonProps extends PipelandSystemProps {
  preset?: ButtonPresets;
  isLoading?: boolean;
  disabled?: boolean;
  onPress(): void;
}

export { ButtonProps };
