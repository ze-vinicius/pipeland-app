import React from "react";
import styled from "styled-components/native";
import {
  ComponentBaseProps,
  ComponentBaseStyleProps,
  COMPONENT_BASE_CSS,
} from "../component-base";

import { presets, TextPresets } from "./text.presets";
import { TextProps } from "./text.props";

interface StyledTextProps extends ComponentBaseStyleProps {
  preset: TextPresets;
}

const StyledText = styled.Text<StyledTextProps>`
  ${(props) => props.preset && presets[props.preset]};
  ${(props) => props.customStyle && COMPONENT_BASE_CSS(props.customStyle)};
`;

export const Text: React.FC<TextProps> = ({
  children,
  preset,
  style,
  marginBottom = 0,
  marginTop = 0,
  marginLeft = 0,
  marginRight = 0,
  flex,
  maxWidth,
}) => {
  const overrideStyle = {
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    flex,
    maxWidth,
  } as any;

  return (
    <StyledText
      preset={preset || "default"}
      customStyle={overrideStyle}
      style={style as any}
    >
      {children}
    </StyledText>
  );
};
