import { css } from "styled-components";
import { ColorType } from "../../theme/color";
import { spacing, SpacingType } from "../../theme/spacing";

type FlexAlignType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";

export interface ComponentBaseProps {
  /**
   * margin-bottom - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  // marginBottom?: SpacingType;

  // /**
  //  * margin-top - based on theme spacing
  //  * [0, 4, 8, 12, 16, 24, 32, 48, 64]
  //  */
  // marginTop?: SpacingType;

  // /**
  //  * margin-left - based on theme spacing
  //  * [0, 4, 8, 12, 16, 24, 32, 48, 64]
  //  */
  // marginLeft?: SpacingType;

  // /**
  //  * margin-right - based on theme spacing
  //  * [0, 4, 8, 12, 16, 24, 32, 48, 64]
  //  */
  // marginRight?: SpacingType;

  // /**
  //  * padding-bottom - based on theme spacing
  //  * [0, 4, 8, 12, 16, 24, 32, 48, 64]
  //  */
  // paddingBottom?: SpacingType;

  // /**
  //  * padding-top - based on theme spacing
  //  * [0, 4, 8, 12, 16, 24, 32, 48, 64]
  //  */
  // paddingTop?: SpacingType;

  // /**
  //  * padding-left - based on theme spacing
  //  * [0, 4, 8, 12, 16, 24, 32, 48, 64]
  //  */
  // paddingLeft?: SpacingType;

  // /**
  //  * padding-right - based on theme spacing
  //  * [0, 4, 8, 12, 16, 24, 32, 48, 64]
  //  */
  // paddingRight?: SpacingType;

  // width?: number | string | undefined;

  // height?: number | string | undefined;

  // position?: "relative" | "absolute";

  // borderRadius?: number | string;

  // top?: number | string | undefined;

  // left?: number | string | undefined;

  // right?: number | string | undefined;

  // bottom?: number | string | undefined;

  backgroundColor?: string | ColorType;

  height?: number | string;
  width?: number | string;

  position?: "absolute" | "relative";
  top?: number | string;
  right?: number | string;
  left?: number | string;
  bottom?: number | string;

  // alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  alignItems?: FlexAlignType;
  alignSelf?: "auto" | FlexAlignType;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";

  // aspectRatio?: number;
  // borderEndWidth?: number | string;
  // end?: number | string;
  // flexBasis?: number | string;
  // flexGrow?: number;
  // flexShrink?: number;
  // flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';

  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderStartWidth?: number | string;
  borderTopWidth?: number;
  borderWidth?: number;
  borderRadius?: number;

  display?: "none" | "flex";
  flex?: number;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";

  // marginStart?: number | string;
  // marginEnd?: number | string;
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

  // overflow?: 'visible' | 'hidden' | 'scroll';
  // paddingEnd?: number | string;
  // paddingStart?: number | string;
  padding?: number | string | SpacingType;
  paddingTop?: number | string | SpacingType;
  paddingRight?: number | string | SpacingType;
  paddingLeft?: number | string | SpacingType;
  paddingBottom?: number | string | SpacingType;
  paddingHorizontal?: number | string | SpacingType;
  paddingVertical?: number | string | SpacingType;

  // start?: number | string;
  // zIndex?: number;

  // backfaceVisibility?: 'visible' | 'hidden';
  // borderBottomColor?: ColorValue;
  // borderBottomEndRadius?: number;
  // borderBottomLeftRadius?: number;
  // borderBottomRightRadius?: number;
  // borderBottomStartRadius?: number;
  // borderBottomWidth?: number;
  // borderColor?: ColorValue;
  // borderEndColor?: ColorValue;
  // borderLeftColor?: ColorValue;
  // borderLeftWidth?: number;
  // borderRightColor?: ColorValue;
  // borderRightWidth?: number;
  // borderStartColor?: ColorValue;
  // borderStyle?: 'solid' | 'dotted' | 'dashed';
  // borderTopColor?: ColorValue;
  // borderTopEndRadius?: number;
  // borderTopLeftRadius?: number;
  // borderTopRightRadius?: number;
  // borderTopStartRadius?: number;
  // borderTopWidth?: number;
  // borderWidth?: number;
  // opacity?: number;
  // testID?: string;
}

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

export const COMPONENT_BASE_CSS = (customStyle: ComponentBaseProps) => css`
  ${customStyle &&
  css`
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

    ${customStyle.height && `height: ${customStyle.height}`};
    ${customStyle.width && `width: ${customStyle.width}`};
    ${customStyle.maxHeight && `max-height: ${customStyle.maxHeight}`}
    ${customStyle.maxHeight && `max-width: ${customStyle.maxWidth}`}
    ${customStyle.maxHeight && `min-height: ${customStyle.minHeight}`}
    ${customStyle.maxHeight && `min-width: ${customStyle.minWidth}`}

    ${customStyle.flex && `flex: ${customStyle.flex}`};
    ${customStyle.alignItems && `align-items: ${customStyle.alignItems}`};
    ${customStyle.alignSelf && `align-left: ${customStyle.alignSelf}`};
    ${customStyle.justifyContent &&
    `justify-content: ${customStyle.justifyContent}`};

    ${customStyle.backgroundColor &&
    `background-color: ${customStyle.backgroundColor}`};

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
  `}
`;

export interface ComponentBaseStyleProps {
  customStyle: ComponentBaseProps;
}
