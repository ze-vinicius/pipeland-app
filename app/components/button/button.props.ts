import { FeatherIconType } from "../../utils/icon-type";
import { PipelandSystemProps } from "../pipeland-system";
import { ButtonPresets } from "./button.presets";

interface ButtonProps extends PipelandSystemProps {
  preset?: ButtonPresets;
  icon?: FeatherIconType;
  isLoading?: boolean;
  disabled?: boolean;
  onPress(): void;
}

export { ButtonProps };
