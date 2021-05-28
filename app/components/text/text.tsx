import React from "react";
import styled from "styled-components/native";

import { presets, TextPresets } from "./text.presets";
import { TextProps } from "./text.props";

const StyledText = styled.Text<{ preset: TextPresets }>`
  ${(prop) => prop.preset && presets[prop.preset]}
`;

export const Text: React.FC<TextProps> = ({ children, preset, style }) => {
  return (
    <StyledText preset={preset || "default"} style={style}>
      {children}
    </StyledText>
  );
};
