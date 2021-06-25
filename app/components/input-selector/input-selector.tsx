import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import RNModal from "react-native-modal";

import { Container } from "../container";
import { Text } from "../text";
import { PipelandFlexProps } from "../pipeland-system";
import { Divider, Icon } from "..";

interface Item {
  label: string;
  value: string;
  icon?: string;
}

interface InputSelectorProps<T extends Item> extends PipelandFlexProps {
  selected: T;
  onChange: (item: T) => void;
  options: Array<T>;
  label?: string;
}

const InputSelector: <T extends Item>(
  props: InputSelectorProps<T>
) => React.ReactElement<InputSelectorProps<T>> = ({
  selected,
  onChange,
  label,
  options,
  ...customStyle
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => setIsVisible(!isVisible);

  return (
    <Container {...customStyle}>
      {label && (
        <Text preset="inputLabel" marginBottom={1}>
          {label}
        </Text>
      )}
      <TouchableOpacity onPress={toggleModal}>
        <Container
          paddingHorizontal={4}
          paddingVertical={2}
          borderColor="line"
          borderWidth={2}
          alignItems="center"
          flexDirection="row"
          borderRadius={4}
        >
          <Container flexDirection="row" alignItems="center" width="100%">
            {selected && selected.icon && (
              <Icon key={selected.value} uri={selected.icon} marginRight={2} />
            )}
            <Text>{selected?.label}</Text>
          </Container>
        </Container>
      </TouchableOpacity>
      {isVisible && (
        <RNModal isVisible={isVisible} onBackdropPress={toggleModal}>
          <Container backgroundColor="background" borderRadius={4} padding={4}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item);
                    toggleModal();
                  }}
                >
                  <Container
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                  >
                    {item.icon && <Icon uri={item.icon} marginRight={2} />}
                    <Text>{item.label}</Text>
                  </Container>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <Divider marginVertical={2} />}
            />
          </Container>
        </RNModal>
      )}
    </Container>
  );
};

export { InputSelector };
