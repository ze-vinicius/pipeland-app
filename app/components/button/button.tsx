import React from "react";
// import { ViewStyle } from "react-native";
import { ButtonProps } from "./button.props";

import { ButtonText, ButtonContainer } from "./button.styles";

import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { FeatherIcon } from "../feather-icon";

const Button: React.FC<ButtonProps> = ({
  children,
  preset = "primary",
  onPress,
  isLoading,
  disabled,
  icon,
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
        <ActivityIndicator
          size={16}
          color={preset === "primary" ? "#fff" : "#cecece"}
        />
      ) : (
        <>
          {!!icon && (
            <FeatherIcon
              name={icon}
              size={20}
              marginRight={2}
              color={preset === "primary" ? "#fff" : "#000"}
            />
          )}
          <ButtonText preset={preset}>{children}</ButtonText>
        </>
      )}
    </ButtonContainer>
  );
};

export { Button };
