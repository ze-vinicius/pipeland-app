import { css } from "styled-components/native";

const BASE = css`
  background-color: ${(props) => props.theme.color.dim};
`;

export const presets = {
  horizontal: css`
    ${BASE}

    height: 1px;
    width: 100%;
  `,

  vertical: css`
    ${BASE}

    width: 1px;
    height: 100%;
  `,
};

export type DividerPresets = keyof typeof presets;
