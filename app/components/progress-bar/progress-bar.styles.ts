import styled from "styled-components/native";

export const Background = styled.View`
  background-color: ${(props) => props.theme.color.line};
  width: 100%;
  height: 4px;
`;
export const FilledBar = styled.View<{ progress: number }>`
  width: ${(props) => (props.progress > 0 ? `${props.progress}%` : 0)};
  flex: 1;
  background-color: ${(props) => props.theme.color.info};
`;

export const Container = styled.View`
  margin-top: 16px;
`;
export const LabelContainer = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CoinsContainer = styled.View`
  flex-direction: row;
`;
