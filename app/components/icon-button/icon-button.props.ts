import { FeatherIconType } from "../../utils/icon-type";
import { PipelandSystemProps } from "../pipeland-system";

interface IconButtonProps extends PipelandSystemProps {
  icon: FeatherIconType;
  iconSize?: number;
  onPress(): void;
}

export { IconButtonProps };
