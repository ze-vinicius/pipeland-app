import { Control } from "react-hook-form";
import { TextInputProps } from "react-native";
import { IconTypes } from "../../../assets/icons";
import { FeatherIconType } from "../../utils/icon-type";
import { PipelandFlexProps } from "../pipeland-system";

interface TextFieldProps extends PipelandFlexProps {
  placeholder?: string;
  label?: string;
  secureTextEntry?: boolean;
  icon?: FeatherIconType | IconTypes;
  error?: string | undefined;
  control: Control<any>;
  name: string;
  defaultValue?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export { TextFieldProps };
