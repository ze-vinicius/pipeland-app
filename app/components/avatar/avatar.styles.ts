import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  PipelandSystemStyleProps,
  pipelandSystemStyle,
} from "../pipeland-system";

export const Container = styled.View<PipelandSystemStyleProps>`
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.dim};
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)}
`;

export const DefaultAvatar = styled(Feather).attrs({
  name: "user",
})`
  color: ${(props) => props.theme.color.primary};
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 32px;
`;
