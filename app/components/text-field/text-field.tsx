import React from "react";
import Feather from "@expo/vector-icons/Feather";

import { Text } from "../text/text";
import { TextFieldProps } from "./text-field.props";
import { Container, InputContainer } from "./text-field.styles";
import { TextInput, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { Controller } from "react-hook-form";
import { FeatherIconType } from "../../utils/icon-type";
import { icons, IconTypes } from "../../../assets/icons";
import { Icon } from "../icon";

const TextFieldBase: React.ForwardRefRenderFunction<TextInput, TextFieldProps> =
  (
    {
      label,
      name,
      defaultValue,
      placeholder,
      secureTextEntry = false,
      icon,
      error,
      control,
      autoCapitalize = "none",
      keyboardType = "default",
      ...customStyle
    },
    ref
  ) => {
    const theme = useTheme();

    const isNotFeather = Object.keys(icons).includes(icon as string);

    return (
      <Container customStyle={customStyle}>
        {!!label && <Text preset="inputLabel">{label}</Text>}
        <InputContainer>
          {icon &&
            (isNotFeather ? (
              <Icon
                name={icon as IconTypes}
                size={16}
                marginRight={2}
                color={"dim"}
              />
            ) : (
              <Feather
                name={icon as FeatherIconType}
                size={16}
                style={{
                  marginRight: theme.spacing[2],
                }}
                color={theme.color.dim}
              />
            ))}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={placeholder || ""}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                onChangeText={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                ref={ref}
                style={{
                  flex: 1,
                }}
              />
            )}
            name={name}
            defaultValue={defaultValue}
          />
        </InputContainer>
        {!!error && (
          <Text preset="errorMessage" marginTop={1}>
            {error}
          </Text>
        )}
      </Container>
    );
  };

const TextField = React.forwardRef(TextFieldBase);

export { TextField };
