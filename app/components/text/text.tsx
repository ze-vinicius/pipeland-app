import React from "react";
import styled, { useTheme } from "styled-components/native";

import { presets, TextPresets } from "./text.presets";
import { TextProps } from "./text.props";

const StyledText = styled.Text<{ preset: TextPresets }>`
  ${(prop) => prop.preset && presets[prop.preset]}
`;

export const Text: React.FC<TextProps> = ({
  children,
  preset,
  style,
  mb = 0,
  mt = 0,
  ml = 0,
  mr = 0,
}) => {
  const theme = useTheme();

  const spacing = theme.spacing;

  const overrideStyle = [
    style,
    {
      marginBottom: Number(spacing[mb]),
      marginTop: Number(spacing[mt]),
      marginRight: Number(spacing[mr]),
      marginLeft: Number(spacing[ml]),
    },
  ];

  return (
    <StyledText preset={preset || "default"} style={overrideStyle}>
      {children}
    </StyledText>
  );
};
