import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Text } from "../../components/text";

export const Container = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing[4]}px;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

export const TaskInfoContainer = styled.View`
  margin-top: ${(props) => props.theme.spacing[4]}px;
  /* flex-direction: row; */
  align-items: center;
`;

export const DeliveryDateContainer = styled.View``;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[2]}px;
`;

export const DateIcon = styled(Feather).attrs({ name: "calendar", size: 24 })`
  margin-right: ${(props) => props.theme.spacing[2]}px;
`;

export const TaskDescription = styled(Text).attrs({
  preset: "secondary",
  mt: 4,
})`
  line-height: 24px;
`;
