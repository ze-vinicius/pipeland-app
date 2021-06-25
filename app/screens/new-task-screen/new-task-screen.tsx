import React, { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import * as yup from "yup";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";

import { Screen } from "../../components";
import { Container } from "../../components/container";
import { TextField } from "../../components/text-field";
import { DateTimePicker } from "../../components/date-time-picker";
import { TextEditor } from "../../components/text-editor";
import { GameElementSelector } from "../../components/game-element-selector/game-element-selector";
import { Button } from "../../components/button";
import { useStores } from "../../store";

const schema = yup.object().shape({
  title: yup.string().required("Esse campo é obrigatório"),
});

interface CorrectTaskFormData {
  title: string;
}

const NewTaskScreen: React.FC = observer(() => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CorrectTaskFormData>({
    resolver: yupResolver(schema),
  });

  const { classesStore } = useStores();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const [descriptionHTML, setDescriptionHTML] = useState<string>();
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const [selectedPenalties, setSelectedPenalties] = useState<any[]>([]);
  const [selectedRewards, setSelectedRewards] = useState<any[]>([]);

  const today = new Date();

  const handleChangeDeliveryDate = (date?: Date) => {
    setDeliveryDate(!!date ? date : deliveryDate);
  };

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

  const onSubmit = async ({ title }: CorrectTaskFormData) => {
    setIsSubmitting(true);

    const formatRequest = {
      title,
      description: descriptionHTML || "",
      delivery_date: deliveryDate,
      task_elements: [...selectedPenalties, ...selectedRewards],
    };

    await classesStore.createTask(formatRequest);

    setIsSubmitting(false);

    navigation.navigate("tasks");
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

          <Container
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
            marginTop={4}
          >
            <DateTimePicker
              flex={1}
              marginRight={2}
              value={deliveryDate}
              mode="date"
              onChange={handleChangeDeliveryDate}
              minimumDate={today}
              label="Data de entrega"
            />

            <DateTimePicker
              flex={1}
              marginLeft={2}
              value={deliveryDate}
              mode="time"
              onChange={handleChangeDeliveryDate}
              minimumDate={today}
              label="Horário de entrega"
            />
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
