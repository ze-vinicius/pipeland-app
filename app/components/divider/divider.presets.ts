import { css } from "styled-components/native";

const BASE = css`
  background-color: ${(props) => props.theme.color.dim};
`;

export const presets = {
  horizontal: css`
    ${BASE}

    height: 2px;
    width: 100%;
  `,

  vertical: css`
    ${BASE}

    width: 2px;
    height: 100%;
  `,
};

export type DividerPresets = keyof typeof presets;
