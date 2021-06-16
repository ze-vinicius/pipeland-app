import React from "react";
// import { ViewStyle } from "react-native";
// import { getStyle } from "../component-base";
import { ButtonProps } from "./button.props";

import { ButtonText, ButtonContainer } from "./button.styles";

import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const Button: React.FC<ButtonProps> = ({
  children,
  preset = "primary",
  onPress,
  isLoading,
  marginBottom = 0,
  marginTop = 0,
  marginLeft = 0,
  marginRight = 0,
}) => {
  const overrideStyle = {
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
  };

  return (
    <ButtonContainer
      preset={preset}
      customStyle={overrideStyle}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size={16} color={"#fff"} />
      ) : (
        <ButtonText preset={preset}>{children}</ButtonText>
      )}
    </ButtonContainer>
  );
};

export { Button };
