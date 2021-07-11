import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Screen,
  Text,
} from "../../components/";
import { useStores } from "../../store";
import { USER_ROLES } from "../../store/sessions-store/user";
import * as ImagePicker from "expo-image-picker";

const ProfileDetailsScreen: React.FC = () => {
  const { sessionsStore } = useStores();
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      const uri = result.uri;

      await sessionsStore.activeSession?.updateUserPhoto({ uri });
      sessionsStore.loadSessionInfo();
    }
  };

  const user = sessionsStore.activeSession?.user;

  return (
    <Screen scroll>
      <Container flex={1} padding={4}>
        <Container paddingTop={4} width="100%" alignItems="center">
          <Container>
            <Avatar size={120} uri={user?.photo_url} name={user?.name} />
            <IconButton
              icon="camera"
              onPress={pickImage}
              position="absolute"
              borderRadius={40}
              color="white"
              iconSize={24}
              bottom={0}
              right={0}
            />
          </Container>

          <Container width="100%" alignItems="center" marginTop={4}>
            <Text preset="title">{user?.name}</Text>
            <Text preset="subtitle">{USER_ROLES[user?.role || "TEACHER"]}</Text>
          </Container>
        </Container>
        <Container marginTop={6} marginBottom={2}>
          <Text preset="header" marginBottom={2}>
            Meus dados
          </Text>
        </Container>
        <Container flex={1} shadow padding={4} borderRadius={8}>
          <Container>
            <Text preset="inputLabel" marginBottom={1}>
              Nome
            </Text>
            <Text preset="bold">{user?.name}</Text>
            <Divider marginTop={2} marginBottom={4} />
          </Container>
          <Container>
            <Text preset="inputLabel" marginBottom={1}>
              Nickname
            </Text>
            <Text preset={user?.nickname ? "bold" : "secondary"}>
              {user?.nickname ?? "Nenhum nickname cadastrado"}
            </Text>
            <Divider marginTop={2} marginBottom={4} />
          </Container>
          <Container>
            <Text preset="inputLabel" marginBottom={1}>
              E-mail
            </Text>
            <Text preset="bold">{user?.email}</Text>
            <Divider marginTop={2} marginBottom={4} />
          </Container>
          <Container>
            <Text preset="inputLabel" marginBottom={1}>
              Cargo
            </Text>
            <Text preset="bold">{USER_ROLES[user?.role || "TEACHER"]}</Text>
            <Divider marginTop={2} marginBottom={4} />
          </Container>
        </Container>
      </Container>
    </Screen>
  );
};

export { ProfileDetailsScreen };
