import React, { useMemo } from "react";
import { AvatarProps } from "./avatar.props";
import { Text } from "../text";
import { Container } from "../container";

import { DefaultAvatar, AvatarImage } from "./avatar.styles";
import utils from "../../utils";
import { formatColor } from "../pipeland-system";

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  backgroundColor,
  color,
  size = 32,
}) => {
  const overrideStyle = {
    width: size,
    height: size,
    borderRadius: size,
  };

  const formatedName = useMemo(() => {
    return !!name ? name.charAt(0) : "";
  }, [name]);

  // const backgroundColor = utils.generateRandomColor();

  return (
    <Container
      alignItems="center"
      backgroundColor={backgroundColor || "line"}
      justifyContent="center"
      {...overrideStyle}
    >
      {!!uri ? (
        <AvatarImage
          source={{
            uri,
          }}
        />
      ) : !!name ? (
        <Container>
          <Text
            textAlign="center"
            color={color || "textSecondary"}
            fontWeight="bold"
            fontSize={size / 1.5}
          >
            {formatedName}
          </Text>
        </Container>
      ) : (
        <DefaultAvatar color={color || "textSecondary"} size={size - 12} />
      )}
    </Container>
  );
};
