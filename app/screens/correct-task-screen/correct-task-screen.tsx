import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Switch } from "react-native";
import * as yup from "yup";

import {
  Container,
  DateTimePicker,
  Screen,
  TextEditor,
  TextField,
  Text,
  Button,
  Icon,
  FeatherIcon,
} from "../../components";
import { MainNavigatorParamsList } from "../../navigators/main-navigator";
import { useStores } from "../../store";

// import { Container } from './styles';

const schema = yup.object().shape({
  coins: yup.number().required("Esse campo é obrigatório"),
});

interface CorrectTaskFormData {
  coins: number;
}

const CorrectTaskScreen: React.FC = () => {
  const route = useRoute<RouteProp<MainNavigatorParamsList, "correctTask">>();
  const navigation = useNavigation();
  const { classesStore } = useStores();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CorrectTaskFormData>({
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selected_student =
    classesStore.taskDetail?.getSelectedStudentTaskCorrection(
      route.params.student_id
    );
  const scrollRef = useRef<ScrollView>(null);
  const [comment, setComment] = useState<string>("");
  const [deliveredDate, setDeliveredDate] = useState(new Date());
  const [gotShell, setGotShell] = useState(false);
  const hasShell = classesStore.taskDetail?.task_elements.find(
    (element) => element.name === "shell"
  );
  const [hasSend, setHasSend] = useState(false);

  const today = new Date();
  const taskCreateDate = classesStore.taskDetail?.create_date;

  const handleChangeDeliveredDate = (date?: Date) => {
    setDeliveredDate(!!date ? date : deliveredDate);
  };

  const onSubmit = async ({ coins }: CorrectTaskFormData) => {
    setIsSubmitting(true);

    const formatRequest = {
      student_id: route.params.student_id,
      coins,
      comment,
      delivered_date: hasSend ? deliveredDate : undefined,
      got_shell: gotShell,
    };

    await classesStore.saveTaskCorrection(formatRequest);

    setIsSubmitting(false);

    classesStore.fetchTaskCorrections();
    navigation.goBack();
  };

  const handleChangeDescription = (html: string) => {
    setComment(html);
  };

  const handleCursorPosition = (scrollY: number) => {
    scrollRef?.current?.scrollTo({ y: scrollY - 30, animated: true });
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        scrollEventThrottle={20}
      >
        <Container padding={4} flex={1}>
          <Container flex={1}>
            <Container marginBottom={4}>
              <Text preset="title" marginBottom={2}>
                Atividade
              </Text>
              <Text>{classesStore.taskDetail?.title}</Text>
            </Container>
            <Container marginBottom={4}>
              <Text preset="title" marginBottom={2}>
                Estudante selecionado
              </Text>
              <Text>{selected_student?.name}</Text>
            </Container>
            <Container
              flexDirection="row"
              alignItems="flex-start"
              marginBottom={4}
              flex={1}
            >
              <TextField
                flex={1}
                label="Coins"
                icon="coin"
                control={control}
                placeholder="pontuação atingida"
                {...register("coins")}
                error={errors.coins && errors.coins.message}
              />
              <Container
                marginLeft={6}
                alignItems="flex-end"
                height="100%"
                justifyContent="space-between"
              >
                <Text preset="inputLabel" marginBottom={4}>
                  Pontuação máxima
                </Text>
                <Container flexDirection="row" alignItems="center">
                  <Icon size={14} name="coin" marginRight={2} />
                  <Text>{classesStore.taskDetail?.task_value}</Text>
                </Container>
              </Container>
            </Container>
            <Container flexDirection="row">
              <Container marginBottom={4} flex={1}>
                <Text preset="inputLabel" marginBottom={2}>
                  Foi enviado?
                </Text>
                <Container flexDirection="row" alignItems="center">
                  <Switch
                    value={hasSend}
                    onValueChange={() => setHasSend(!hasSend)}
                  />
                  <FeatherIcon
                    name="send"
                    size={20}
                    marginLeft={4}
                    color="textSecondary"
                  />
                </Container>
              </Container>
              {!!hasShell && !!hasSend && (
                <Container marginBottom={4} flex={1}>
                  <Text preset="inputLabel" marginBottom={2}>
                    Enviou em branco?
                  </Text>
                  <Container flexDirection="row" alignItems="center">
                    <Switch
                      value={gotShell}
                      onValueChange={() => setGotShell(!gotShell)}
                    />
                    <Icon name="shell" size={20} marginLeft={4} />
                  </Container>
                </Container>
              )}
            </Container>

            {!!hasSend && (
              <Container
                flexDirection="row"
                width="100%"
                justifyContent="space-between"
                marginBottom={4}
              >
                <DateTimePicker
                  flex={1}
                  marginRight={2}
                  value={deliveredDate}
                  minimumDate={
                    taskCreateDate ? new Date(taskCreateDate) : undefined
                  }
                  mode="date"
                  onChange={handleChangeDeliveredDate}
                  maximumDate={today}
                  label="Data da entrega"
                />

                <DateTimePicker
                  flex={1}
                  marginLeft={2}
                  value={deliveredDate}
                  mode="time"
                  onChange={handleChangeDeliveredDate}
                  minimumDate={
                    taskCreateDate ? new Date(taskCreateDate) : undefined
                  }
                  maximumDate={today}
                  label="Horário da entrega"
                />
              </Container>
            )}
            <TextEditor
              label="Comentário"
              onChange={handleChangeDescription}
              onCursorPosition={handleCursorPosition}
            />
          </Container>
          <Button
            isLoading={isSubmitting}
            marginTop={8}
            onPress={handleSubmit(onSubmit)}
          >
            Salvar correção
          </Button>
        </Container>
      </ScrollView>
    </Screen>
  );
};

export { CorrectTaskScreen };
