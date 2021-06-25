import React, { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import RNDateTimePicker, {
  Event,
} from "@react-native-community/datetimepicker";
import { Container } from "../container";
import { FeatherIcon } from "../feather-icon";
import { Text } from "../text";
import { formatDate, FormatDateType } from "../../utils/date";
import { PipelandFlexProps } from "../pipeland-system";

// import { Container } from './styles';

interface DateTimePickerProps extends PipelandFlexProps {
  value: Date;
  mode?: "date" | "time";
  onChange: (date?: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  label?: string;
}

const dateTimePickerFormat = {
  date: "dd/MM/yyyy",
  time: "hh:mm",
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  mode = "date",
  onChange,
  maximumDate,
  minimumDate,
  label,
  ...customStyle
}) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: Event, date?: Date) => {
    setShow(Platform.OS === "ios");
    onChange(date);
  };

  return (
    <Container {...customStyle}>
      {label && (
        <Text preset="inputLabel" marginBottom={1}>
          {label}
        </Text>
      )}
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Container
          paddingHorizontal={4}
          paddingVertical={2}
          borderColor="line"
          borderWidth={2}
          alignItems="center"
          flexDirection="row"
          borderRadius={4}
        >
          <FeatherIcon name="calendar" marginRight="4" size={16} />
          <Text>
            {formatDate(value, dateTimePickerFormat[mode] as FormatDateType)}
          </Text>
        </Container>
      </TouchableOpacity>
      {show && (
        <RNDateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </Container>
  );
};

export { DateTimePicker };
