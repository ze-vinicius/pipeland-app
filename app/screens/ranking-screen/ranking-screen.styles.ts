import styled, { css } from "styled-components/native";

export const Container = styled.View``;

export const RankingTableContainer = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.line};
  padding-vertical: ${(props) => props.theme.spacing[4]}px;
  /* justify-content: space-between; */
`;

export const RankingNumberContainer = styled.View<{
  isInPodium?: boolean;
}>`
  margin-right: ${(props) => props.theme.spacing[5]}px;
  padding-vertical: ${(props) => props.theme.spacing[2]}px;
  padding-left: ${(props) => props.theme.spacing[4]}px;
  padding-right: ${(props) => props.theme.spacing[4]}px;

  ${(props) =>
    props.isInPodium &&
    css`
      background-color: ${(props) => props.theme.color.dim};
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    `}
`;

export const RankingNumber = styled.Text``;

export const CoinContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing[4]}px;
`;
