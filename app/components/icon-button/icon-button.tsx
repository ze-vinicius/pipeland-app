import React from "react";

import { Container } from "./icon-button.styles";
import { IconButtonProps } from "./icon-button.props";
import { FeatherIcon } from "../feather-icon";
import { iconPresets } from "./icon-button.presets";

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  preset = "primary",
  iconSize = 16,
  ...customStyle
}) => {
  return (
    <Container preset={preset} customStyle={customStyle} onPress={onPress}>
      <FeatherIcon name={icon} size={iconSize} {...iconPresets[preset]} />
    </Container>
  );
};

export { IconButton };
