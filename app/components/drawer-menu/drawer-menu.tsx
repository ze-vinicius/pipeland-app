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

const DrawerMenu: React.FC = observer(() => {
  const { drawerMenuStore, sessionsStore } = useStores();
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
        paddingTop={5}
      >
        <SafeAreaView>
          <Container
            paddingLeft={2}
            paddingBottom={2}
            marginBottom={2}
            borderBottomColor="line"
            borderBottomWidth={1}
            flexDirection="row"
            alignItems="center"
          >
            <Container
              padding={2}
              borderWidth={1}
              marginRight={2}
              borderRadius={100}
              borderColor="line"
              backgroundColor="line"
            >
              <Icon name="coin" size={24} />
            </Container>
            <Container>
              <Text preset="subtitle">Bem vindo,</Text>
              <Text preset="subtitle">
                {sessionsStore.activeSession?.user?.name}!
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
            ItemSeparatorComponent={() => (
              <Divider marginVertical={2} height={1} />
            )}
          />
        </SafeAreaView>
      </Container>
    </ReactNativeModal>
  );
});

export { DrawerMenu };
