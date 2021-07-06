import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";

import { Screen, Text, Container, SectionedMenu } from "../../components";
import { useStores } from "../../store";

const SettingsScreen: React.FC = observer(() => {
  const { sessionsStore } = useStores();
  const navigation = useNavigation();

  return (
    <Screen>
      <Container flex={1}>
        <SectionedMenu
          items={[
            {
              title: "Ajustes",
              data: [
                {
                  icon: "user",
                  title: "Meu cadastro",
                  onPress: () => navigation.navigate("underConstruction"),
                },
                {
                  icon: "log-out",
                  title: "Sair",
                  onPress: () => sessionsStore.logout(),
                },
              ],
            },
          ]}
        />
      </Container>
      <Container alignItems="center">
        <Text preset="secondary">Versão 0.1</Text>
      </Container>
    </Screen>
  );
});

export { SettingsScreen };
