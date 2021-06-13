import React from "react";
import { observer } from "mobx-react";
import Feather from "@expo/vector-icons/Feather";

import { Avatar, Screen, Text } from "../../components";
import { useStores } from "../../store";

import {
  Container,
  AdjustsContainer,
  AdjustButton,
} from "./profile-screen.styles";
import { FeatherIconType } from "../../utils/icon-type";

const ProfileScreen: React.FC = observer(() => {
  const { classesStore, sessionsStore } = useStores();

  const avatarUrl = classesStore.selectedClass?.student_info?.photo;
  const userName = classesStore.selectedClass?.student_info?.student_name;

  const adjustsButtons: Array<{
    title: string;
    icon: FeatherIconType;
    onPress(): void;
  }> = [
    // {
    //   title: "Meus dados",
    //   icon: "edit",
    //   onPress: () => {},
    // },
    {
      title: "Sair",
      icon: "log-out",
      onPress: () => sessionsStore.logout(),
    },
  ];

  return (
    <Screen unsafe>
      <Container>
        <Avatar uri={avatarUrl} size={100} />
        <Text preset="title" marginTop={4}>
          {userName}
        </Text>
        <AdjustsContainer>
          <Text preset="header" marginBottom={4} marginLeft={4} marginTop={6}>
            Ajustes
          </Text>
          {adjustsButtons.map((adjustButton) => (
            <AdjustButton
              key={adjustButton.title}
              onPress={adjustButton.onPress}
            >
              <Feather name={adjustButton.icon} size={16} />
              <Text marginLeft={4} preset="title">
                {adjustButton.title}
              </Text>
            </AdjustButton>
          ))}
        </AdjustsContainer>
      </Container>
    </Screen>
  );
});

export { ProfileScreen };
