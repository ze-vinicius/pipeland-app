import { Control } from "react-hook-form";
import { TextInputProps } from "react-native";
import { FeatherIconType } from "../../utils/icon-type";
import { ComponentBaseProps } from "../component-base";

interface TextFieldProps extends ComponentBaseProps, TextInputProps {
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
