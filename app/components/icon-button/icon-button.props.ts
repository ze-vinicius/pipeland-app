import { FeatherIconType } from "../../utils/icon-type";
import { ComponentBaseProps } from "../component-base";

interface IconButtonProps extends ComponentBaseProps {
  icon: FeatherIconType;
  iconSize?: number;
  onPress(): void;
}

export { IconButtonProps };
