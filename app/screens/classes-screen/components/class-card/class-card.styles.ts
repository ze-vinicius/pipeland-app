import styled from "styled-components/native";

export const ClassContainer = styled.TouchableOpacity`
  padding: 16px;
  margin: 8px;
  margin-bottom: 16px;
  background-color: ${(props) => props.theme.color.background};
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1px;
  elevation: 1;
`;

export const StudentStatusContainer = styled.View`
  flex-direction: row;
  margin-top: 24px;
  align-items: center;
`;

export const GameElementContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
