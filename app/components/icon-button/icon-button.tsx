import React from "react";
import Feather from "@expo/vector-icons/Feather";

import { Container } from "./icon-button.styles";
import { IconButtonProps } from "./icon-button.props";

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  preset = "primary",
  iconSize = 16,
  ...customStyle
}) => {
  return (
    <Container preset={preset} customStyle={customStyle} onPress={onPress}>
      <Feather name={icon} size={iconSize} />
    </Container>
  );
};

export { IconButton };
