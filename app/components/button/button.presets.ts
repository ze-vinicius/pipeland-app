import { css } from "styled-components/native";

const BASE_BUTTON = css`
  padding-horizontal: ${(props) => props.theme.spacing[2]}px;
  padding-vertical: ${(props) => props.theme.spacing[2]}px;

  border-radius: 4px;
  align-items: center;
`;

const BASE_TEXT = css`
  font-size: 16px;
`;

export const buttonPresets = {
  primary: css`
    ${BASE_BUTTON}

    background-color: ${(props) => props.theme.color.primary};
  `,

  secondary: css`
    ${BASE_BUTTON}
  `,
};

export const textPresets = {
  primary: css`
    ${BASE_TEXT}

    color: ${(props) => props.theme.color.background};
    font-weight: bold;
  `,
  secondary: css`
    ${BASE_TEXT}
  `,
};

export type ButtonPresets = keyof typeof buttonPresets;
