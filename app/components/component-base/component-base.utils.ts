import { ComponentBaseProps } from "./component-base.props";
import { spacing } from "../../theme/spacing";

export const getStyle = <T extends unknown>(
  style: Partial<ComponentBaseProps>
): T => {
  const {
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    ...rest
  } = style;

  return {
    marginTop: marginTop ? spacing[marginTop] : undefined,
    marginRight: marginRight ? spacing[marginRight] : undefined,
    marginBottom: marginBottom ? spacing[marginBottom] : undefined,
    marginLeft: marginLeft ? spacing[marginLeft] : undefined,
    paddingTop: paddingTop ? spacing[paddingTop] : undefined,
    paddingRight: paddingRight ? spacing[paddingRight] : undefined,
    paddingBottom: paddingBottom ? spacing[paddingBottom] : undefined,
    paddingLeft: paddingLeft ? spacing[paddingLeft] : undefined,
    ...rest,
  } as T;
};
