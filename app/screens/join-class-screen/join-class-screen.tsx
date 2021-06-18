import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Screen } from "../../components";
import { Button } from "../../components/button";
import { TextField } from "../../components/text-field";
import { useStores } from "../../store";
import { Container } from "../../components/container";

const schema = yup.object().shape({
  classInviteToken: yup.string().required("Esse campo é obrigatório"),
});

interface JoinClassFormData {
  classInviteToken: string;
}

const JoinClassScreen: React.FC = observer(() => {
  const { classesStore } = useStores();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<JoinClassFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ classInviteToken }: JoinClassFormData) => {
    await classesStore.joinClass({ class_invite_token: classInviteToken });
    navigation.navigate("classes");
  };

  return (
    <Screen unsafe>
      <Container padding={4}>
        <TextField
          label="Código de convite da turma"
          control={control}
          placeholder="Código de convite"
          marginBottom={4}
          {...register("classInviteToken")}
          error={errors.classInviteToken && errors.classInviteToken.message}
        />

        <Button
          isLoading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty}
        >
          Ingressar
        </Button>
      </Container>
    </Screen>
  );
});

export { JoinClassScreen };
