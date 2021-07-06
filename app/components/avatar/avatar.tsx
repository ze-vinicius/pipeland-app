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
    if (!!name) {
      const nameArray = name.split(" ");

      return `${nameArray[0].charAt(0)}${
        nameArray.length > 1 ? nameArray[1].charAt(0) : ""
      }`;
    }

    return "";
  }, [name]);

  // const backgroundColor = utils.generateRandomColor();

  return (
    <Container
      alignItems="center"
      backgroundColor={backgroundColor || "lightGreen"}
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
            color={color || "darkGreen"}
            fontWeight="600"
            fontSize={size / 1.75}
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
