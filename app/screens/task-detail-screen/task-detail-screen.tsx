import { observer } from "mobx-react";
import React from "react";
import { Divider } from "../../components/divider";
import { Icon } from "../../components/icon/icon";

import { Screen } from "../../components/screen";
import { StatusLabel } from "../../components/status-label";
import { Text } from "../../components/text";
import { useStores } from "../../store";
import { formatDate } from "../../utils/date";

import {
  Container,
  TaskInfoContainer,
  DeliveryDateContainer,
  DateContainer,
  DateIcon,
  Row,
  TaskDescription,
} from "./task-detail-screen.styles";

const TaskDetailScreen: React.FC = observer(() => {
  const { classesStore } = useStores();

  return (
    <Screen isLoading={classesStore.isLoading} unsafe>
      {classesStore.taskDetail && (
        <Container>
          <StatusLabel type="corrected" />
          <Text preset="title" marginTop={4}>
            {classesStore.taskDetail?.title}
          </Text>
          <TaskInfoContainer>
            <Row>
              <DeliveryDateContainer>
                <Text preset="secondary">DATA DE ENTREGA</Text>
                <DateContainer>
                  <DateIcon />
                  <Text>
                    {formatDate(
                      classesStore.taskDetail.delivery_date,
                      "dd/MM/yyyy '-' hh:mm"
                    )}
                  </Text>
                </DateContainer>
              </DeliveryDateContainer>
              <DeliveryDateContainer>
                <Text preset="secondary">COINS</Text>
                <DateContainer>
                  <Icon name="coin" />
                  <Text> {classesStore.taskDetail?.task_value}</Text>
                </DateContainer>
              </DeliveryDateContainer>
            </Row>
            <Row>
              <DeliveryDateContainer>
                <Text preset="secondary">ELEMENTOS DO JOGO</Text>
                <DateContainer>
                  {classesStore.taskDetail?.task_elements.map(
                    (task_element) => (
                      <Icon
                        key={task_element.id}
                        marginRight={2}
                        uri={task_element.imageUrl}
                      />
                    )
                  )}
                </DateContainer>
              </DeliveryDateContainer>
            </Row>
          </TaskInfoContainer>
          <Divider />
          <TaskDescription>
            {classesStore.taskDetail?.description}
          </TaskDescription>
        </Container>
      )}
    </Screen>
  );
});

export { TaskDetailScreen };
