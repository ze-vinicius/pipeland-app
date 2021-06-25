import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import {
  PipelandSystemProps,
  pipelandSystemStyle,
  PipelandSystemStyleProps,
} from "../pipeland-system";

export const StyledView = styled.View<PipelandSystemStyleProps>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)}
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

interface ContainerProps extends PipelandSystemProps {
  scroll?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, scroll, ...rest }) => {
  return scroll ? (
    <StyledScrollView>
      <StyledView customStyle={rest}>{children}</StyledView>
    </StyledScrollView>
  ) : (
    <StyledView customStyle={rest}>{children}</StyledView>
  );
};

export { Container };
