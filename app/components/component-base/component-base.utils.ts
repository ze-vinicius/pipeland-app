import { ComponentBaseProps } from "./component-base.props";
import { spacing } from "../../theme/spacing";

export const getStyle = (style: Partial<ComponentBaseProps>) => {
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
    marginTop: spacing[marginTop || 0],
    marginRight: spacing[marginRight || 0],
    marginBottom: spacing[marginBottom || 0],
    marginLeft: spacing[marginLeft || 0],
    paddingTop: spacing[paddingTop || 0],
    paddingRight: spacing[paddingRight || 0],
    paddingBottom: spacing[paddingBottom || 0],
    paddingLeft: spacing[paddingLeft || 0],
    ...rest,
  };
};
