import React, { useMemo } from "react";
import { format } from "date-fns";

import { StatusLabel } from "../../../../components/status-label";
import { Text } from "../../../../components/text";
import { Icon } from "../../../../components/icon/icon";
import { Divider } from "../../../../components/divider";

import {
  ClassContainer,
  StudentStatusContainer,
  GameElementContainer,
} from "./class-card.styles";
import { ClassCardProps } from "./class-card.props";
import { formatDate } from "../../../../utils/date";

const ClassCard: React.FC<ClassCardProps> = ({ onPress, classInfo }) => {
  const formattedClassDate = useMemo(() => {
    return formatDate(classInfo.create_date, "dd 'de' MMM 'de' yyyy");
  }, []);

  return (
    <ClassContainer onPress={onPress}>
      <StatusLabel type={classInfo.active ? "opened" : "closed"} />
      <Text preset="title" marginTop={2} marginBottom={2}>
        {classInfo.name}
      </Text>
      <Text preset="subtitle" marginBottom={2}>
        Professor {classInfo.teacher_name}
      </Text>
      <Text preset="subtitle">{formattedClassDate}</Text>
      {/* <StudentStatusContainer>
        <GameElementContainer>
          <Icon name="coin" marginRight={4} />
          <Text preset="secondary">40</Text>
        </GameElementContainer>
        <Divider preset="vertical" marginLeft={4} marginRight={4} />
        <GameElementContainer>
          <Icon name="mario" marginRight={4} />
          <Text preset="secondary">Mário</Text>
        </GameElementContainer>
      </StudentStatusContainer> */}
    </ClassContainer>
  );
};

export { ClassCard };
