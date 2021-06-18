import React from "react";
import styled from "styled-components/native";
import { FeatherIconType } from "../../utils/icon-type";
import { Container } from "../container";
import { PipelandSystemStyleProps } from "../pipeland-system";
import { Text } from "../text";
import Feather from "@expo/vector-icons/Feather";
import { SectionList } from "react-native";

interface SectionedMenuProps extends PipelandSystemStyleProps {
  items: Array<{
    title: string;
    data: Array<{
      title: string;
      icon: FeatherIconType;
      onPress(): void;
    }>;
  }>;
}

export const MenuButton = styled.TouchableOpacity`
  width: 100%;
  padding: ${(props) => props.theme.spacing[4]}px;
  border-top-color: ${(props) => props.theme.color.line};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.color.line};

  flex-direction: row;
  align-items: center;
`;

const SectionedMenu: React.FC<SectionedMenuProps> = ({ items }) => {
  return (
    <Container flex={1} width="100%">
      <SectionList
        sections={items}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <MenuButton key={item.title} onPress={item.onPress}>
            <Feather name={item.icon} size={16} />
            <Text marginLeft={4} preset="title">
              {item.title}
            </Text>
          </MenuButton>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Container width="100%" backgroundColor={"background"}>
            <Text preset="header" marginBottom={4} marginTop={4} marginLeft={4}>
              {title}
            </Text>
          </Container>
        )}
      />
    </Container>
  );
};

export { SectionedMenu };
