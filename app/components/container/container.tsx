import React from "react";
import styled, { css } from "styled-components/native";

import {
  PipelandSystemProps,
  pipelandSystemStyle,
  PipelandSystemStyleProps,
} from "../pipeland-system";

export const StyledView = styled.View<
  { shadow?: boolean } & PipelandSystemStyleProps
>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)}

  ${(props) =>
    props.shadow &&
    css`
      padding-horizontal: 32px;
      padding-vertical: 24px;
      flex-direction: row;
      margin-bottom: 4px;

      background-color: ${(props) => props.theme.color.background};
      shadow-color: #000;
      shadow-offset: 0 1px;
      shadow-opacity: 0.18;
      shadow-radius: 1px;
      elevation: 1;
    `}
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

interface ContainerProps extends PipelandSystemProps {
  scroll?: boolean;
  shadow?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  shadow,
  scroll,
  ...rest
}) => {
  return scroll ? (
    <StyledScrollView>
      <StyledView customStyle={rest}>{children}</StyledView>
    </StyledScrollView>
  ) : (
    <StyledView shadow={shadow} customStyle={rest}>
      {children}
    </StyledView>
  );
};

export { Container };
