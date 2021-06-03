import { SpacingType } from "../../theme/spacing";

export interface ComponentBaseProps {
  /**
   * margin-bottom - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  marginBottom?: SpacingType;

  /**
   * margin-top - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  marginTop?: SpacingType;

  /**
   * margin-left - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  marginLeft?: SpacingType;

  /**
   * margin-right - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  marginRight?: SpacingType;

  /**
   * padding-bottom - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  paddingBottom?: SpacingType;

  /**
   * padding-top - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  paddingTop?: SpacingType;

  /**
   * padding-left - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  paddingLeft?: SpacingType;

  /**
   * padding-right - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  paddingRight?: SpacingType;

  width?: number | string;

  height?: number | string;
}
