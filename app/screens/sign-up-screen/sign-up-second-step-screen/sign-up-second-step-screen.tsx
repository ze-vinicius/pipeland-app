import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Screen } from "../../../components";
import { Container } from "../../../components/container";
import { Text } from "../../../components";
import { TextField } from "../../../components/text-field";
// import { Container } from './styles';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../../components/button";
import { useStores } from "../../../store";

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(4, "Mínimo 4 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas precisam ser iguais"),
});

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

enum roles {
  TEACHER = "Professor",
  STUDENT = "Aluno",
}

const SignUpSecondStepScreen: React.FC = () => {
  const { sessionsStore } = useStores();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { role } = useRoute<
    RouteProp<
      {
        signUpSecondStepScreen: {
          role: "STUDENT" | "TEACHER";
        };
      },
      "signUpSecondStepScreen"
    >
  >().params;

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, name, password }: SignUpFormData) => {
    setIsSubmitting(true);

    await sessionsStore.signUp({
      email,
      name,
      password,
      role,
    });

    setIsSubmitting(false);
  };

  return (
    <Screen unsafe>
      <Container padding={4}>
        <Container marginBottom={4}>
          <Text preset="inputLabel">Tipo de usuário</Text>
          <Text marginTop={2} preset="bold">
            {roles[role]}
          </Text>
        </Container>

        <TextField
          label="Nome"
          control={control}
          placeholder="Seu nome"
          icon="user"
          marginBottom={4}
          {...register("name")}
          error={errors.name && errors.name.message}
        />

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
          marginBottom={4}
          error={errors.password && errors.password.message}
          secureTextEntry
          {...register("password")}
        />

        <TextField
          label="Confirmar senha"
          control={control}
          placeholder="password"
          icon="lock"
          error={
            errors.password_confirmation && errors.password_confirmation.message
          }
          secureTextEntry
          {...register("password_confirmation")}
        />

        <Button
          marginTop={6}
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        >
          Registrar
        </Button>
      </Container>
    </Screen>
  );
};

export { SignUpSecondStepScreen };
