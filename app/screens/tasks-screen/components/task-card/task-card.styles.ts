import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Icon } from "../../../../components/icon/icon";

export const Container = styled.View`
  padding: ${(props) => props.theme.spacing[4]}px;
  background-color: ${(props) => props.theme.color.background};
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1px;
  elevation: 1;
`;

export const CardHeader = styled.View``;

export const CardBody = styled.View``;

export const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DateInfoContainer = styled.View`
  flex-direction: row;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  align-items: center;
`;

export const CalendarIcon = styled(Feather).attrs({ name: "calendar" })`
  margin-right: ${(props) => props.theme.spacing[2]}px;
  color: ${(props) => props.theme.color.dim};
  font-size: 12px;
`;

export const GameElementsContainer = styled.View`
  flex-direction: row;
`;

export const GameElement = styled(Icon)`
  margin-right: ${(props) => props.theme.spacing[2]}px;
`;

export const CoinContainer = styled.View`
  flex-direction: row;
`;
