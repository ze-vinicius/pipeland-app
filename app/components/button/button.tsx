import React from "react";
// import { ViewStyle } from "react-native";
import { ButtonProps } from "./button.props";

import { ButtonText, ButtonContainer } from "./button.styles";

import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const Button: React.FC<ButtonProps> = ({
  children,
  preset = "primary",
  onPress,
  isLoading,
  disabled,
  ...overrideStyle
}) => {
  return (
    <ButtonContainer
      preset={preset}
      customStyle={overrideStyle}
      onPress={onPress}
      disabled={!!disabled || !!isLoading}
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
