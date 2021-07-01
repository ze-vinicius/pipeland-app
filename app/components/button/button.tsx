import React from "react";
import { ActivityIndicator } from "react-native";

import { ButtonProps } from "./button.props";
import { ButtonText, ButtonContainer, ButtonIcon } from "./button.styles";
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
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator
          size={16}
          color={preset === "primary" ? "#fff" : "#cecece"}
        />
      ) : (
        <>
          {!!icon && (
            <ButtonIcon
              name={icon}
              preset={preset}
              disabled={!!disabled || !!isLoading}
            />
          )}
          <ButtonText preset={preset} disabled={!!disabled || !!isLoading}>
            {children}
          </ButtonText>
        </>
      )}
    </ButtonContainer>
  );
};

export { Button };
