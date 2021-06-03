import { StyleProp, ImageProps } from "react-native";
import { IconTypes } from "../../../assets/icons";
import { ComponentBaseProps } from "../component-base";

export interface IconProps extends ComponentBaseProps {
  name: IconTypes;
  style?: StyleProp<ImageProps>;
  size?: number;
}
