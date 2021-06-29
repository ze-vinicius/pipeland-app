import styled, { css } from "styled-components/native";
import { formatColor } from "../../components";

export const Container = styled.View``;

export const RankingTableContainer = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.line};
  padding-vertical: ${(props) => props.theme.spacing[4]}px;
  /* justify-content: space-between; */
`;

const rankingColors: {
  [key: number]: string;
} = {
  1: "alert",
  2: "primary",
  3: "info",
};

export const RankingNumberContainer = styled.View<{
  ranking: number;
}>`
  margin-right: ${(props) => props.theme.spacing[5]}px;
  padding-vertical: ${(props) => props.theme.spacing[2]}px;
  padding-left: ${(props) => props.theme.spacing[4]}px;
  padding-right: ${(props) => props.theme.spacing[4]}px;

  ${(props) =>
    props.ranking <= 3 &&
    css`
      background-color: ${formatColor(rankingColors[props.ranking])};
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
