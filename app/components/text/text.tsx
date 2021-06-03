import React from "react";
import styled from "styled-components/native";
import { getStyle } from "../component-base";

import { presets, TextPresets } from "./text.presets";
import { TextProps } from "./text.props";

const StyledText = styled.Text<{ preset: TextPresets }>`
  ${(prop) => prop.preset && presets[prop.preset]}
`;

export const Text: React.FC<TextProps> = ({
  children,
  preset,
  style,
  marginBottom = 0,
  marginTop = 0,
  marginLeft = 0,
  marginRight = 0,
}) => {
  const overrideStyle = getStyle({
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
  });

  return (
    <StyledText preset={preset || "default"} style={[style, overrideStyle]}>
      {children}
    </StyledText>
  );
};
