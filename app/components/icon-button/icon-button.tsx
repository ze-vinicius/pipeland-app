import React from "react";
import Feather from "@expo/vector-icons/Feather";

import { Container } from "./icon-button.styles";
import { IconButtonProps } from "./icon-button.props";

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  iconSize = 16,
  marginBottom = 0,
  marginTop = 0,
  marginLeft = 0,
  marginRight = 0,
  paddingBottom = 0,
  paddingTop = 0,
  paddingLeft = 0,
  paddingRight = 0,
  position = "relative",
  borderRadius = 0,
  top,
  bottom,
  left,
  right,
}) => {
  const overrideStyle = {
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    position,
    borderRadius,
    top,
    bottom,
    left,
    right,
  } as any;

  return (
    <Container customStyle={overrideStyle} onPress={onPress}>
      <Feather name={icon} size={iconSize} />
    </Container>
  );
};

export { IconButton };
