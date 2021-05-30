import React from "react";
import { ViewStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";

import { DividerPresets, presets } from "./divider.presets";
import { DividerProps } from "./divider.props";

const StyledDivider = styled.View<{ preset: DividerPresets }>`
  ${(prop) => prop.preset && presets[prop.preset]}
`;

export const Divider: React.FC<DividerProps> = ({
  preset = "horizontal",
  mb = 0,
  mt = 0,
  mr = 0,
  ml = 0,
}) => {
  const { spacing } = useTheme();

  const styleOverride = {
    marginTop: spacing[mt],
    marginRight: spacing[mr],
    marginBottom: spacing[mb],
    marginLeft: spacing[ml],
  } as ViewStyle;

  return <StyledDivider preset={preset} style={styleOverride} />;
};
