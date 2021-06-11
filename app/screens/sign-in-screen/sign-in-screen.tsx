import React from "react";
import { observer } from "mobx-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Screen } from "../../components";
import { TextField } from "../../components/text-field";
import { Text } from "../../components";
import { Button } from "../../components/button";

import { Container } from "./sign-in-screen.styles";
import { useStores } from "../../store";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
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
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const { sessionsStore } = useStores();

  const onSubmit = (data: SignInFormData) => {
    const { email, password } = data;

    sessionsStore.login({ email, password });
  };

  return (
    <Screen>
      <Container>
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

        {sessionsStore.errorMessage && (
          <Text preset="errorMessage" marginTop={2}>
            {sessionsStore.errorMessage}
          </Text>
        )}

        <Button
          marginTop={6}
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Container>
    </Screen>
  );
});

export { SignInScreen };
