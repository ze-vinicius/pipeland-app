import styled, { css } from "styled-components/native";

const BASE = css`
  color: ${(props) => props.theme.color.text};
  font-size: 14px;
`;

export const presets = {
  default: BASE,

  bold: css`
    ${BASE};
    font-weight: bold;
  `,

  header: css`
    ${BASE};

    font-size: 20px;
    font-weight: bold;
  `,

  title: css`
    ${BASE}

    font-size: 16px;
    font-weight: bold;
  `,

  subtitle: css`
    ${BASE}

    color: ${(props) => props.theme.color.dim};
  `,

  secondary: css`
    ${BASE}

    font-size: 12px;
    color: ${(props) => props.theme.color.dim};
  `,
};

export type TextPresets = keyof typeof presets;
