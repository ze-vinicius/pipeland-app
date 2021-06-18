import { StyleProp, ImageProps } from "react-native";
import { IconTypes } from "../../../assets/icons";
import { PipelandSystemProps } from "../pipeland-system";

export interface IconProps extends PipelandSystemProps {
  name?: IconTypes;
  uri?: string;
  style?: StyleProp<ImageProps>;
  size?: number;
}
