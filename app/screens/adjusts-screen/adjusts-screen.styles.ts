import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export const AdjustsContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const AdjustButton = styled.TouchableOpacity`
  width: 100%;
  padding: ${(props) => props.theme.spacing[4]}px;
  border-top-color: ${(props) => props.theme.color.line};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.color.line};

  flex-direction: row;
  align-items: center;
`;
