import React from "react";
import styled from "styled-components/native";
import {
  PipelandFlexProps,
  pipelandFlexStyle,
  PipelandSystemStyleProps,
} from "../pipeland-system";

import { DividerPresets, presets } from "./divider.presets";
import { DividerProps } from "./divider.props";

const StyledDivider = styled.View<
  PipelandSystemStyleProps & { preset: DividerPresets }
>`
  ${(prop) => prop.preset && presets[prop.preset]};
  ${(props) => props.customStyle && pipelandFlexStyle(props.customStyle)}
`;

export const Divider: React.FC<DividerProps> = ({
  preset = "horizontal",
  ...customStyle
}) => {
  return <StyledDivider preset={preset} customStyle={customStyle} />;
};
