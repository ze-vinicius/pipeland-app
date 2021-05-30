import { SpacingType } from "./spacing";

export interface BaseComponentInterface {
  /**
   * margin-bottom - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  mb?: SpacingType;

  /**
   * margin-top - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  mt?: SpacingType;

  /**
   * margin-left - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  ml?: SpacingType;

  /**
   * margin-right - based on theme spacing
   * [0, 4, 8, 12, 16, 24, 32, 48, 64]
   */
  mr?: SpacingType;
}
