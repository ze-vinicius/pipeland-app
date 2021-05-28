import { StyleProp, ImageProps } from "react-native";
import { IconTypes } from "../../../assets/icons";

export interface IconProps {
  name: IconTypes;
  style?: StyleProp<ImageProps>;
}
