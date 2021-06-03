import { StyleProp, ImageProps } from "react-native";
import { IconTypes } from "../../../assets/icons";
import { ComponentProps } from "../../theme/component-props";

export interface IconProps extends ComponentProps {
  name: IconTypes;
  style?: StyleProp<ImageProps>;
  size?: number;
}
