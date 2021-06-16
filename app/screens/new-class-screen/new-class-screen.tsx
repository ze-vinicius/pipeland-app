import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Screen } from "../../components";
import { Button } from "../../components/button";
import { TextField } from "../../components/text-field";
import { useStores } from "../../store";

import { Container } from "./new-class.styles";

const schema = yup.object().shape({
  name: yup.string().required(),
});

interface NewClassFormData {
  name: string;
}

const NewClassScreen: React.FC = observer(() => {
  const { classesStore } = useStores();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NewClassFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ name }: NewClassFormData) => {
    await classesStore.createClass({ name });
    navigation.navigate("classes");
  };

  return (
    <Screen unsafe>
      <Container>
        <TextField
          label="Nome"
          control={control}
          placeholder="Minha nova turma"
          marginBottom={4}
          {...register("name")}
          error={errors.name && errors.name.message}
        />

        <Button isLoading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Nova turma
        </Button>
      </Container>
    </Screen>
  );
});

export { NewClassScreen };
