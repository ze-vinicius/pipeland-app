import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import {
  ProgressBar,
  Container,
  Divider,
  FeatherIcon,
  Icon,
  Screen,
  StatusLabel,
  Text,
  AutoHeightWebvView,
  Button,
} from "../../components";
import { useStores } from "../../store";
import { formatDate } from "../../utils/date";
import { isAfter } from "date-fns/esm";
import { Alert } from "react-native";

const TaskDetailScreen: React.FC = observer(() => {
  const { classesStore, sessionsStore } = useStores();
  const navigation = useNavigation();

  const selectedTask = classesStore.selectedTask;

  const isTeacher = sessionsStore.activeSession?.user?.role === "TEACHER";

  const handleDeleteTask = () => {
    Alert.alert(
      "Atenção",
      "Você está prestes a deletar uma atividade. essa ação não poderá ser desfeita",
      [
        {
          text: "Deletar",
          onPress: async () => {
            await classesStore.deleteTask({ task_id: selectedTask?.id || "" });
            navigation.navigate("tasks");
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <Screen isLoading={classesStore.isLoading.taskDetails} unsafe>
      {!!selectedTask && (
        <Container flex={1}>
          <Container flex={1} padding={4} height="100%" scroll>
            <StatusLabel type={selectedTask.status} />
            <Text preset="title" marginTop={4}>
              {selectedTask.title}
            </Text>
            <Container marginTop={4}>
              <Container
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <Container flex={1}>
                  <Text preset="secondary" marginBottom={2}>
                    PERÍODO DE ENTREGA
                  </Text>
                  <Container flexDirection="row" alignItems="center">
                    <Container flexDirection="row" alignItems="center">
                      <FeatherIcon name="calendar" marginRight={2} size={14} />
                      <Text>
                        {formatDate(
                          selectedTask.create_date,
                          "dd/MM/yyyy '-' hh:mm"
                        )}
                      </Text>
                    </Container>

                    <FeatherIcon
                      name="arrow-right"
                      marginHorizontal={2}
                      color="textSecondary"
                      marginRight={2}
                      size={14}
                    />

                    <Container flexDirection="row" alignItems="center">
                      <FeatherIcon name="calendar" marginRight={2} size={14} />
                      <Text>
                        {formatDate(
                          selectedTask.delivery_date,
                          "dd/MM/yyyy '-' hh:mm"
                        )}
                      </Text>
                    </Container>
                  </Container>
                </Container>
              </Container>
              <Container
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <Container>
                  <Text preset="secondary">ELEMENTOS DA ATIVIDADE</Text>
                  <Container
                    flexDirection="row"
                    alignItems="center"
                    marginTop={2}
                  >
                    {selectedTask.task_elements.map((task_element) => (
                      <Icon
                        key={task_element.id}
                        marginRight={2}
                        uri={task_element.imageUrl}
                      />
                    ))}
                  </Container>
                </Container>
                <Container>
                  <Text preset="secondary">COINS</Text>
                  <Container
                    flexDirection="row"
                    alignItems="center"
                    marginTop={2}
                  >
                    <Icon name="coin" />
                    <Text> {selectedTask.task_value}</Text>
                  </Container>
                </Container>
              </Container>
            </Container>
            <Divider height={1} />
            {!!selectedTask.description ? (
              <Container flex={1} marginTop={4} minHeight={200}>
                <AutoHeightWebvView html={selectedTask.description} />
              </Container>
            ) : (
              <Container flex={1} marginTop={4} marginBottom={8}>
                <Text preset="secondary">
                  Não há descrição para a atividade
                </Text>
              </Container>
            )}

            {selectedTask.task_correction && (
              <Container>
                <Text preset="header" marginTop={4}>
                  Correção
                </Text>
                <ProgressBar
                  marginTop={4}
                  totalPoints={selectedTask.task_value}
                  currentPoints={selectedTask.task_correction.earned_coins}
                />
                <Container marginTop={4}>
                  <Text marginBottom={2}>PENALIDADES APLICADAS</Text>
                  <Container flexDirection="row">
                    {!selectedTask.task_correction.applied_penalties.length ? (
                      <Text preset="secondary">
                        Nenhuma penalidade foi aplicada
                      </Text>
                    ) : (
                      selectedTask.task_correction.applied_penalties.map(
                        (applied_penalty) => (
                          <Icon
                            key={applied_penalty.id}
                            marginRight={2}
                            uri={applied_penalty.imageUrl}
                          />
                        )
                      )
                    )}
                  </Container>
                </Container>
                <Container marginTop={4}>
                  <Text marginBottom={2}>BONUS APLICADOS</Text>
                  <Container flexDirection="row">
                    {!selectedTask.task_correction.applied_bonuses.length ? (
                      <Text preset="secondary">Nenhum bônus foi aplicado</Text>
                    ) : (
                      selectedTask.task_correction.applied_bonuses.map(
                        (applied_bonus) => (
                          <Icon
                            key={applied_bonus.id}
                            marginRight={2}
                            uri={applied_bonus.imageUrl}
                          />
                        )
                      )
                    )}
                  </Container>
                </Container>
                <Container marginTop={4}>
                  <Text preset="title">Comentário do professor</Text>
                  {selectedTask.task_correction.comment ? (
                    <Container flex={1} marginTop={2}>
                      <AutoHeightWebvView
                        html={selectedTask.task_correction.comment}
                      />
                    </Container>
                  ) : (
                    <Text preset="secondary" marginTop={2}>
                      Sem comentários do professor
                    </Text>
                  )}
                </Container>
              </Container>
            )}
          </Container>
          {isTeacher && (
            <Container
              borderTopColor="line"
              borderTopWidth={1}
              backgroundColor="white"
              padding={4}
            >
              <>
                {isAfter(new Date(), new Date(selectedTask.delivery_date)) && (
                  <Button
                    onPress={() => navigation.navigate("taskCorrections")}
                    marginHorizontal={4}
                    marginBottom={4}
                    icon="corner-down-right"
                  >
                    Correções
                  </Button>
                )}
              </>
              <Container
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  onPress={() => navigation.navigate("editTask")}
                  preset="secondary"
                  marginHorizontal={4}
                  marginBottom={4}
                  icon="edit"
                >
                  Editar
                </Button>

                <Button
                  onPress={handleDeleteTask}
                  preset="secondary"
                  marginHorizontal={4}
                  marginBottom={4}
                  icon="trash"
                >
                  Deletar
                </Button>
              </Container>
            </Container>
          )}
        </Container>
      )}
    </Screen>
  );
});

export { TaskDetailScreen };
