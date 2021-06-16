import React from "react";
import { Text } from "../text/text";
import { TextFieldProps } from "./text-field.props";
import { Container, InputContainer } from "./text-field.styles";
import Feather from "@expo/vector-icons/Feather";
import { TextInput, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { getStyle } from "../component-base";
import { Controller } from "react-hook-form";

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
      marginBottom = 0,
      marginTop = 0,
      marginLeft = 0,
      marginRight = 0,
      ...rest
    },
    ref
  ) => {
    const overrideStyle = {
      marginBottom,
      marginTop,
      marginLeft,
      marginRight,
    };

    const theme = useTheme();

    return (
      <Container customStyle={overrideStyle}>
        {!!label && <Text preset="inputLabel">{label}</Text>}
        <InputContainer>
          {icon && (
            <Feather
              name={icon}
              size={16}
              style={{
                marginRight: theme.spacing[2],
              }}
              color={theme.color.dim}
            />
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={placeholder || ""}
                secureTextEntry={secureTextEntry}
                onChangeText={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                {...rest}
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
