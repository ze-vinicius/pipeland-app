import { css } from "styled-components";
import { ColorType, color } from "../../theme/color";
import { spacing, SpacingType } from "../../theme/spacing";

type FlexAlignType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";

export interface PipelandFlexProps {
  height?: number | string;
  width?: number | string;

  position?: "absolute" | "relative";
  top?: number | string;
  right?: number | string;
  left?: number | string;
  bottom?: number | string;

  opacity?: number;

  alignItems?: FlexAlignType;
  alignSelf?: "auto" | FlexAlignType;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";

  display?: "none" | "flex";
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";

  margin?: number | string | SpacingType;
  marginTop?: number | string | SpacingType;
  marginRight?: number | string | SpacingType;
  marginBottom?: number | string | SpacingType;
  marginLeft?: number | string | SpacingType;
  marginHorizontal?: number | string | SpacingType;
  marginVertical?: number | string | SpacingType;

  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;

  padding?: number | string | SpacingType;
  paddingTop?: number | string | SpacingType;
  paddingRight?: number | string | SpacingType;
  paddingLeft?: number | string | SpacingType;
  paddingBottom?: number | string | SpacingType;
  paddingHorizontal?: number | string | SpacingType;
  paddingVertical?: number | string | SpacingType;
}

export interface PipelandTextProps {
  color?: string | ColorType;
  fontSize?: number;
  fontStyle?: "normal" | "italic";
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
}

export interface PipelandViewProps {
  backgroundColor?: string | ColorType;

  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderStartWidth?: number | string;
  borderTopWidth?: number;
  borderWidth?: number;
  borderRadius?: number;

  borderColor?: string | ColorType;
  borderBottomColor?: string | ColorType;
  borderLeftColor?: string | ColorType;
  borderRightColor?: string | ColorType;
  borderTopColor?: string | ColorType;
}

export interface PipelandSystemProps
  extends PipelandViewProps,
    PipelandFlexProps,
    PipelandTextProps {}

export const addUnitToValue = (value: number | string) => {
  if (String(value).includes("px") || String(value).includes("%")) {
    return value;
  }

  return `${value}px`;
};

export const formatSpacing = (value: number | string) => {
  if (String(value).includes("px") || String(value).includes("%")) {
    return value;
  }

  const spacingValue = addUnitToValue(spacing[Number(value)]);

  return spacingValue;
};

export const formatColor = (colorString: ColorType | string) => {
  if (colorString.includes("#") || colorString === "transparent") {
    return colorString;
  }

  if (color.hasOwnProperty(colorString)) {
    return color[colorString as ColorType];
  }

  return "transparent";
};

export const pipelandTextStyle = (customStyle: PipelandTextProps) => css`
  ${customStyle.color && `color: ${formatColor(customStyle.color)}`};
  ${customStyle.fontSize &&
  `font-size: ${addUnitToValue(customStyle.fontSize)}`};
  ${customStyle.fontStyle && `font-style: ${customStyle.fontStyle}`};
  ${customStyle.fontWeight && `font-weight: ${customStyle.fontWeight}`};
  ${customStyle.letterSpacing &&
  `letter-spacing: ${customStyle.letterSpacing}`};
  ${customStyle.lineHeight &&
  `line-height: ${addUnitToValue(customStyle.lineHeight)}`};
  ${customStyle.textAlign && `text-align: ${customStyle.textAlign}`};
  ${customStyle.textTransform &&
  `text-transform: ${customStyle.textTransform}`};
`;

export const pipelandFlexStyle = (customStyle: PipelandSystemProps) => css`
  ${customStyle.margin && `margin: ${formatSpacing(customStyle.margin)}`};
  ${customStyle.marginTop &&
  `margin-top: ${formatSpacing(customStyle.marginTop)}`};
  ${customStyle.marginRight &&
  `margin-right: ${formatSpacing(customStyle.marginRight)}`};
  ${customStyle.marginBottom &&
  `margin-bottom: ${formatSpacing(customStyle.marginBottom)}`};
  ${customStyle.marginLeft &&
  `margin-left: ${formatSpacing(customStyle.marginLeft)}`};
  ${customStyle.marginHorizontal &&
  `margin-horizontal: ${formatSpacing(customStyle.marginHorizontal)}`};
  ${customStyle.marginVertical &&
  `margin-vertical: ${formatSpacing(customStyle.marginVertical)}`};

  ${customStyle.padding && `padding: ${formatSpacing(customStyle.padding)}`};
  ${customStyle.paddingTop &&
  `padding-top: ${formatSpacing(customStyle.paddingTop)}`};
  ${customStyle.paddingRight &&
  `padding-right: ${formatSpacing(customStyle.paddingRight)}`};
  ${customStyle.paddingBottom &&
  `padding-bottom: ${formatSpacing(customStyle.paddingBottom)}`};
  ${customStyle.paddingLeft &&
  `padding-left: ${formatSpacing(customStyle.paddingLeft)}`};
  ${customStyle.paddingHorizontal &&
  `padding-horizontal: ${formatSpacing(customStyle.paddingHorizontal)}`};
  ${customStyle.paddingVertical &&
  `padding-vertical: ${formatSpacing(customStyle.paddingVertical)}`};

  ${customStyle.position && `position: ${customStyle.position}`};

  ${customStyle.top !== undefined && `top: ${customStyle.top}`};
  ${customStyle.right !== undefined && `right: ${customStyle.right}`};
  ${customStyle.left !== undefined && `left: ${customStyle.left}`};
  ${customStyle.bottom !== undefined && `bottom: ${customStyle.bottom}`};

  ${customStyle.flex && `flex: ${customStyle.flex}`};
  ${customStyle.flexGrow && `flex-grow: ${customStyle.flexGrow}`};
  ${customStyle.flexShrink && `flex-shrink: ${customStyle.flexShrink}`};
  ${customStyle.flexDirection &&
  `flex-direction: ${customStyle.flexDirection}`};
  ${customStyle.alignItems && `align-items: ${customStyle.alignItems}`};
  ${customStyle.alignSelf && `align-self: ${customStyle.alignSelf}`};
  ${customStyle.justifyContent &&
  `justify-content: ${customStyle.justifyContent}`};

  ${customStyle.height && `height: ${addUnitToValue(customStyle.height)}`};
  ${customStyle.width && `width: ${addUnitToValue(customStyle.width)}`};
  ${customStyle.maxHeight &&
  `max-height: ${addUnitToValue(customStyle.maxHeight)}`}
  ${customStyle.maxWidth &&
  `max-width: ${addUnitToValue(customStyle.maxWidth)}`}
    ${customStyle.minHeight &&
  `min-height: ${addUnitToValue(customStyle.minHeight)}`}
    ${customStyle.minWidth &&
  `min-width: ${addUnitToValue(customStyle.minWidth)}`};

  ${customStyle.opacity && `opacity: ${customStyle.opacity}`}
`;

export const pipelandSystemStyle = (customStyle: PipelandSystemProps) => css`
  ${customStyle &&
  css`
    ${pipelandFlexStyle(customStyle)};

    ${customStyle.backgroundColor &&
    `background-color: ${formatColor(customStyle.backgroundColor)}`};

    ${customStyle.borderBottomWidth &&
    `border-bottom-width: ${addUnitToValue(customStyle.borderBottomWidth)}`};
    ${customStyle.borderLeftWidth &&
    `border-left-width: ${addUnitToValue(customStyle.borderLeftWidth)}`};
    ${customStyle.borderRightWidth &&
    `border-right-width: ${addUnitToValue(customStyle.borderRightWidth)}`};
    ${customStyle.borderStartWidth &&
    `border-start-width: ${addUnitToValue(customStyle.borderStartWidth)}`};
    ${customStyle.borderTopWidth &&
    `border-top-width: ${addUnitToValue(customStyle.borderTopWidth)}`};
    ${customStyle.borderWidth &&
    `border-width: ${addUnitToValue(customStyle.borderWidth)}`};
    ${customStyle.borderRadius &&
    `
      border-radius: ${addUnitToValue(customStyle.borderRadius)};
    `};

    ${customStyle.borderColor &&
    `border-color: ${formatColor(customStyle.borderColor)}`}
    ${customStyle.borderBottomColor &&
    `border-bottomColor: ${formatColor(customStyle.borderBottomColor)}`}
    ${customStyle.borderLeftColor &&
    `border-leftColor: ${formatColor(customStyle.borderLeftColor)}`}
    ${customStyle.borderRightColor &&
    `border-rightColor: ${formatColor(customStyle.borderRightColor)}`}
    ${customStyle.borderTopColor &&
    `border-topColor: ${formatColor(customStyle.borderTopColor)}`}
  `}
`;

export interface PipelandSystemStyleProps {
  customStyle?: PipelandSystemProps;
}
