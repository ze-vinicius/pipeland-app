import styled from "styled-components/native";
import {
  pipelandSystemStyle,
  PipelandSystemStyleProps,
} from "../pipeland-system";

export const Image = styled.Image<PipelandSystemStyleProps>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)}
`;
