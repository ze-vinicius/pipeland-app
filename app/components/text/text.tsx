import React from "react";
import styled, { css } from "styled-components/native";
import {
  PipelandSystemStyleProps,
  pipelandSystemStyle,
  pipelandTextStyle,
} from "../pipeland-system";

import { presets, TextPresets } from "./text.presets";
import { TextProps } from "./text.props";

interface StyledTextProps extends PipelandSystemStyleProps {
  preset: TextPresets;
}

const StyledText = styled.Text<StyledTextProps>`
  ${(props) => props.preset && presets[props.preset]};
  ${(props) =>
    props.customStyle &&
    css`
      ${pipelandSystemStyle(props.customStyle)};
      ${pipelandTextStyle(props.customStyle)}
    `};
`;

export const Text: React.FC<TextProps> = ({
  children,
  preset,
  selectable = false,
  ...overrideStyle
}) => {
  return (
    <StyledText
      preset={preset || "default"}
      customStyle={overrideStyle}
      selectable={selectable}
    >
      {children}
    </StyledText>
  );
};
