import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Screen, Text } from "../../../components";
import { Button } from "../../../components/button";
import { Container } from "../../../components/container";

const SignUpFirstStepScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Screen unsafe>
      <Container flex={1} padding={4}>
        <Text preset="header">Seja bem vindo!</Text>
        <Text marginTop={4}>
          Você está quase pronto para começar a participar do nosso app, mas
          antes disso, me diga: você é um...
        </Text>
        <Container flex={1} justifyContent={"center"}>
          <Button
            onPress={() =>
              navigation.navigate("signUpSecondStep", {
                role: "STUDENT",
              })
            }
          >
            Aluno
          </Button>
          <Button
            onPress={() =>
              navigation.navigate("signUpSecondStep", {
                role: "TEACHER",
              })
            }
            marginTop={2}
          >
            Professor
          </Button>
        </Container>
      </Container>
    </Screen>
  );
};

export { SignUpFirstStepScreen };
