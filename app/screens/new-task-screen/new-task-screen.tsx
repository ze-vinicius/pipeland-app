import React, { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import * as yup from "yup";
import { observer } from "mobx-react";
import { Controller, useForm } from "react-hook-form";

import {
  Screen,
  Text,
  Container,
  TextField,
  DateTimePicker,
  TextEditor,
  Button,
} from "../../components";
import { GameElementSelector } from "../../components/game-element-selector/game-element-selector";
import { useStores } from "../../store";

interface CorrectTaskFormData {
  title: string;
  start_date: Date;
  delivery_date: Date;
}

const NewTaskScreen: React.FC = observer(() => {
  const schema = yup.object().shape({
    title: yup.string().required("Esse campo é obrigatório"),
    start_date: yup
      .date()
      .max(
        yup.ref("delivery_date"),
        "A data de início deve ser após a data de entrega"
      )
      .required(),
    delivery_date: yup
      .date()
      .min(
        yup.ref("start_date"),
        "A data de entrega deve ser após a data de início"
      )
      .required(),
  });
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<CorrectTaskFormData>({
    resolver: yupResolver(schema),
  });

  const { classesStore } = useStores();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const [descriptionHTML, setDescriptionHTML] = useState<string>();

  const [selectedPenalties, setSelectedPenalties] = useState<any[]>([]);
  const [selectedRewards, setSelectedRewards] = useState<any[]>([]);

  const handleChangeSelectedPenalties = (selected: any[]) => {
    setSelectedPenalties(selected);
  };

  const handleChangeSelectedRewards = (selected: any[]) => {
    setSelectedRewards(selected);
  };

  const handleChangeDescription = (html: string) => {
    setDescriptionHTML(html);
  };

  const handleCursorPosition = (scrollY: number) => {
    scrollRef?.current?.scrollTo({ y: scrollY - 30, animated: true });
  };

  const onSubmit = async ({
    title,
    delivery_date,
    start_date,
  }: CorrectTaskFormData) => {
    setIsSubmitting(true);

    const formatRequest = {
      title,
      description: descriptionHTML || "",
      delivery_date,
      start_date,
      task_elements: [...selectedPenalties, ...selectedRewards],
    };

    await classesStore.createTask(formatRequest);

    setIsSubmitting(false);

    if (!classesStore.errorMessage) {
      navigation.navigate("tasks");
    }
  };

  return (
    <Screen unsafe>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        scrollEventThrottle={20}
      >
        <Container padding={4}>
          <TextField
            label="Título"
            control={control}
            placeholder="Título da atividade"
            marginBottom={4}
            {...register("title")}
            error={errors.title && errors.title.message}
          />

          <TextEditor
            label="Descrição da atividade"
            onChange={handleChangeDescription}
            onCursorPosition={handleCursorPosition}
          />

          <Container marginTop={6}>
            <Text preset="subtitle" fontWeight="bold" marginBottom={2}>
              Início do período de entrega
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
            >
              <Controller
                control={control}
                name={"start_date"}
                defaultValue={new Date()}
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    flex={1}
                    marginRight={2}
                    mode="date"
                    value={value}
                    onChange={(date) => onChange(date)}
                    label="Data de início"
                  />
                )}
              />
              <Controller
                control={control}
                name={"start_date"}
                defaultValue={new Date()}
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    flex={1}
                    marginLeft={2}
                    mode="time"
                    value={value}
                    onChange={(date) => onChange(date)}
                    label="Horário de início"
                  />
                )}
              />
            </Container>
            {errors.start_date && (
              <Text preset="errorMessage" marginTop={2}>
                {errors.start_date.message}
              </Text>
            )}
          </Container>
          <Container marginTop={6}>
            <Text preset="subtitle" fontWeight="bold" marginBottom={2}>
              Final do período de entrega
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
            >
              <Controller
                control={control}
                name={"delivery_date"}
                defaultValue={new Date()}
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    flex={1}
                    marginRight={2}
                    mode="date"
                    value={value}
                    onChange={(date) => onChange(date)}
                    minimumDate={getValues("start_date")}
                    label="Data de entrega"
                  />
                )}
              />
              <Controller
                control={control}
                name={"delivery_date"}
                defaultValue={new Date()}
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    flex={1}
                    marginLeft={2}
                    mode="time"
                    value={value}
                    onChange={(date) => onChange(date)}
                    minimumDate={getValues("start_date")}
                    label="Horário de entrega"
                  />
                )}
              />
            </Container>
            {errors.delivery_date && (
              <Text preset="errorMessage" marginTop={2}>
                {errors.delivery_date.message}
              </Text>
            )}
          </Container>

          <GameElementSelector
            onChange={handleChangeSelectedRewards}
            type="REWARD"
            marginTop={4}
          />

          <GameElementSelector
            onChange={handleChangeSelectedPenalties}
            type="PENALTY"
            marginTop={4}
          />

          <Button
            isLoading={isSubmitting}
            marginVertical={6}
            onPress={handleSubmit(onSubmit)}
          >
            Criar
          </Button>
        </Container>
      </ScrollView>
    </Screen>
  );
});

export { NewTaskScreen };
