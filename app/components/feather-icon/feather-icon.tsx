import React from "react";
import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import styled from "styled-components/native";

import { FeatherIconType } from "../../utils/icon-type";
import {
  PipelandFlexProps,
  pipelandSystemStyle,
  PipelandSystemStyleProps,
} from "../pipeland-system";

const StyledFeather = styled(Feather)<PipelandSystemStyleProps>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)};
`;

interface FeatherIconProps extends PipelandFlexProps {
  name: FeatherIconType;
  size?: number;
  color?: string;
}

const FeatherIcon: React.FC<FeatherIconProps> = ({
  name,
  size,
  color,
  ...style
}) => {
  return (
    <StyledFeather name={name} size={size} color={color} customStyle={style} />
  );
};

export { FeatherIcon };
