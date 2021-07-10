import React, { useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { observer } from "mobx-react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import ReactNativeModal from "react-native-modal";

import { useStores } from "../../store";

import { Divider } from "../divider";
import { Container } from "../container";
import { Button } from "../button";
import { Text } from "../text";
import { Icon } from "../icon";
import { Avatar } from "../avatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DrawerMenu: React.FC = observer(() => {
  const { drawerMenuStore, sessionsStore } = useStores();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state.routes);

  const handleMenuButtonPress = (route: string) => {
    navigation.navigate(route);
    drawerMenuStore.drawerMenu.setCurrentRouteName(route);
    drawerMenuStore.toggleMenu();
  };

  useEffect(() => {
    drawerMenuStore.drawerMenu.setCurrentRouteName(
      routes[routes.length - 1].name
    );
  }, [routes]);

  const topInset = insets.top + 16;

  return (
    <ReactNativeModal
      onBackdropPress={() => drawerMenuStore.toggleMenu()}
      isVisible={drawerMenuStore.drawerMenu.isVisible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={{
        margin: 0,
      }}
    >
      <Container
        backgroundColor="#fff"
        flex={1}
        height={"100%"}
        width={"80%"}
        paddingBottom={`${insets.bottom}px`}
      >
        <Container
          paddingTop={`${topInset}px`}
          paddingLeft={2}
          paddingBottom={4}
          marginBottom={2}
          borderBottomColor="line"
          borderBottomWidth={1}
          flexDirection="row"
          alignItems="center"
        >
          <Avatar
            name={sessionsStore.activeSession?.user?.name}
            uri={sessionsStore.activeSession?.user?.photo_url}
            size={32}
          />
          <Container marginLeft={4}>
            <Text preset="subtitle">Bem vindo,</Text>
            <Text preset="subtitle">
              {sessionsStore.activeSession?.user?.name}
            </Text>
          </Container>
        </Container>
        <FlatList
          style={{
            height: "100%",
          }}
          data={drawerMenuStore.drawerMenu.menuItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Button
              icon={item.icon}
              preset="link"
              onPress={() => handleMenuButtonPress(item.route)}
              disabled={
                drawerMenuStore.drawerMenu.currentRouteName === item.route
              }
            >
              {item.title}
            </Button>
          )}
        />
        <Divider height={1} />
        <Container>
          <Button
            icon={"log-out"}
            preset="link"
            onPress={() => sessionsStore.logout()}
          >
            Sair
          </Button>
        </Container>
      </Container>
    </ReactNativeModal>
  );
});

export { DrawerMenu };
