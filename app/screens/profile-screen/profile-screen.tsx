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
import { SectionedMenu } from "../../components/sectioned-menu";

const ProfileScreen: React.FC = observer(() => {
  const { classesStore, sessionsStore } = useStores();

  const avatarUrl = sessionsStore?.activeSession?.user?.photo;
  const userName = sessionsStore?.activeSession?.user?.name;

  const adjustsButtons: Array<{
    title: string;
    data: Array<{
      title: string;
      icon: FeatherIconType;
      onPress(): void;
    }>;
  }> = [
    {
      title: "Ajustes",
      data: [
        {
          title: "Sair",
          icon: "log-out",
          onPress: () => sessionsStore.logout(),
        },
      ],
    },
    // {
    //   title: "Meus dados",
    //   icon: "edit",
    //   onPress: () => {},
    // },
  ];

  return (
    <Screen unsafe>
      <Container>
        <Avatar name={userName} uri={avatarUrl} size={100} />
        <Text preset="title" marginTop={4}>
          {userName}
        </Text>
        <SectionedMenu items={adjustsButtons} />
      </Container>
    </Screen>
  );
});

export { ProfileScreen };
