import { Control } from "react-hook-form";
import { TextInputProps } from "react-native";
import { FeatherIconType } from "../../utils/icon-type";
import { PipelandFlexProps } from "../pipeland-system";

interface TextFieldProps extends PipelandFlexProps, TextInputProps {
  placeholder?: string;
  label?: string;
  secureTextEntry?: boolean;
  icon?: FeatherIconType;
  error?: string | undefined;
  control: Control<any>;
  name: string;
  defaultValue?: string;
}

export { TextFieldProps };
