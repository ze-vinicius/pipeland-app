import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ClassContainer = styled.TouchableOpacity`
  padding: 16px;
  background-color: ${(props) => props.theme.color.background};
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1px;
  elevation: 1;
`;
export const ClassTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const TeacherName = styled.Text`
  font-size: 14px;
  margin-top: 8px;
  color: ${(props) => props.theme.color.dim};
`;
