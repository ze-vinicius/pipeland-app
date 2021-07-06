import { FeatherIconType } from "../../utils/icon-type";
import { PipelandSystemProps } from "../pipeland-system";
import { IconButtonPresets } from "./icon-button.presets";

interface IconButtonProps extends PipelandSystemProps {
  icon: FeatherIconType;
  label?: string;
  preset?: IconButtonPresets;
  iconSize?: number;
  labelFontSize?: number;
  onPress(): void;
}

export { IconButtonProps };
