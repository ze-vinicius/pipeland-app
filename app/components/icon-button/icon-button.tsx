import React from "react";

import { Container } from "./icon-button.styles";
import { IconButtonProps } from "./icon-button.props";
import { FeatherIcon } from "../feather-icon";
import { iconPresets } from "./icon-button.presets";
import { Text } from "../text";

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  label,
  preset = "primary",
  iconSize = 16,
  labelFontSize = 14,
  color,
  ...customStyle
}) => {
  return (
    <Container preset={preset} customStyle={customStyle} onPress={onPress}>
      <FeatherIcon
        name={icon}
        size={iconSize}
        color={color || iconPresets[preset].color}
      />
      {!!label && (
        <Text
          fontSize={labelFontSize}
          color={color || iconPresets[preset].color}
          marginTop={1}
        >
          {label}
        </Text>
      )}
    </Container>
  );
};

export { IconButton };
