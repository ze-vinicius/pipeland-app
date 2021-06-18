import React, { useCallback } from "react";
import { observer } from "mobx-react";
import Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";

import { Screen, Text } from "../../components";
import { useStores } from "../../store";

import { FeatherIconType } from "../../utils/icon-type";
import { SectionedMenu } from "../../components/sectioned-menu";
import { Container } from "../../components/container";
import { Button } from "../../components/button";

const AdjustsScreen: React.FC = observer(() => {
  const { classesStore, sessionsStore } = useStores();
  const classInviteToken = classesStore.selectedClass?.invite_token;
  const navigation = useNavigation();

  const menuSections: Array<{
    title: string;
    data: Array<{
      title: string;
      icon: FeatherIconType;
      onPress(): void;
    }>;
  }> = [
    {
      title: "Ajustes da turma",
      data: [
        {
          title: "Configurações",
          icon: "edit",
          onPress: () => navigation.navigate("underConstruction"),
        },
        {
          title: "Membros da turma",
          icon: "users",
          onPress: () => navigation.navigate("underConstruction"),
        },
      ],
    },
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
  ];

  const handleCopyToClipboard = useCallback(() => {
    if (!!classInviteToken) {
      Clipboard.setString(classInviteToken);
    }
  }, [classInviteToken]);

  return (
    <Screen unsafe>
      <Container alignItems="center" flex={1}>
        <Container width={"100%"} padding={4} backgroundColor="dim">
          <Text marginBottom={2} preset="title">
            Código de convite da turma
          </Text>
          <Button onPress={handleCopyToClipboard}>
            <Text selectable>{classInviteToken}</Text>
          </Button>
        </Container>
        <SectionedMenu items={menuSections} />
      </Container>
    </Screen>
  );
});

export { AdjustsScreen };
