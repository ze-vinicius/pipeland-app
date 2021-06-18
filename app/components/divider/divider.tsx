import React from "react";
import styled from "styled-components/native";

import { DividerPresets, presets } from "./divider.presets";
import { DividerProps } from "./divider.props";

const StyledDivider = styled.View<{ preset: DividerPresets }>`
  ${(prop) => prop.preset && presets[prop.preset]}
`;

export const Divider: React.FC<DividerProps> = ({
  preset = "horizontal",
  marginBottom = 0,
  marginTop = 0,
  marginRight = 0,
  marginLeft = 0,
}) => {
  const overrideStyle = {
    marginBottom,
    marginTop,
    marginRight,
    marginLeft,
  };

  return <StyledDivider preset={preset} style={overrideStyle} />;
};
