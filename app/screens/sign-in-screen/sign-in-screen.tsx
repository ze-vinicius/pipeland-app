import React, { useState } from "react";
import { observer } from "mobx-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Screen, Container, Icon } from "../../components";
import { TextField } from "../../components/text-field";
import { Text } from "../../components";
import { Button } from "../../components/button";

// import { Container } from "./sign-in-screen.styles";
import { useStores } from "../../store";
import { useNavigation } from "@react-navigation/native";

const schema = yup.object().shape({
  email: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

interface SignInFormData {
  email: string;
  password: string;
}

const SignInScreen: React.FC = observer(() => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const { sessionsStore } = useStores();
  const navigation = useNavigation();

  const onSubmit = async (data: SignInFormData) => {
    const { email, password } = data;
    await sessionsStore.login({ email, password });
  };

  return (
    <Screen scroll>
      <Container paddingTop={6} paddingHorizontal={4}>
        <Container alignItems="center" marginTop={8}>
          <Icon height={150} width={150} name="logo" />
        </Container>
        <Text preset="header" marginBottom={5} marginTop={5}>
          Entrar
        </Text>

        <TextField
          label="E-mail"
          control={control}
          placeholder="johndoe@example.com"
          icon="mail"
          marginBottom={4}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          {...register("email")}
          error={errors.email && errors.email.message}
        />

        <TextField
          label="Senha"
          control={control}
          placeholder="password"
          icon="lock"
          error={errors.password && errors.password.message}
          secureTextEntry
          {...register("password")}
        />

        {!!sessionsStore.errorMessage && (
          <Text preset="errorMessage" marginTop={2}>
            {sessionsStore.errorMessage}
          </Text>
        )}

        <Button
          marginTop={6}
          onPress={handleSubmit(onSubmit)}
          isLoading={sessionsStore.isLoading.login}
        >
          Entrar
        </Button>

        <Button
          preset="secondary"
          icon="log-in"
          onPress={() => navigation.navigate("signUpFirstStep")}
          marginTop={8}
        >
          Criar conta
        </Button>
      </Container>
    </Screen>
  );
});

export { SignInScreen };
