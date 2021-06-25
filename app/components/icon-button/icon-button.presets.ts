import { css } from "styled-components/native";

const BASE_BUTTON = css`
  padding: ${(props) => props.theme.spacing[2]}px;

  /* border-radius: 4px; */
  align-items: center;
`;

export const iconButtonPresets = {
  primary: css`
    ${BASE_BUTTON}

    background-color: ${(props) => props.theme.color.primary};
  `,

  secondary: css`
    ${BASE_BUTTON}
  `,
};

export type IconButtonPresets = keyof typeof iconButtonPresets;
