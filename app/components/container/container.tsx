import React from "react";
import styled from "styled-components/native";

import {
  PipelandSystemProps,
  pipelandSystemStyle,
  PipelandSystemStyleProps,
} from "../pipeland-system";

export const StyledView = styled.View<PipelandSystemStyleProps>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)}
`;

type ContainerProps = PipelandSystemProps;

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return <StyledView customStyle={rest}>{children}</StyledView>;
};

export { Container };
