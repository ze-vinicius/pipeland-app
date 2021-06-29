import React, { useMemo } from "react";

import { StatusLabel } from "../../../../components/status-label";
import { Text } from "../../../../components/text";

import { ClassCardProps } from "./class-card.props";
import { formatDate } from "../../../../utils/date";
import { Container } from "../../../../components";
import { TouchableOpacity } from "react-native";

const ClassCard: React.FC<ClassCardProps> = ({ onPress, classInfo }) => {
  const formattedClassDate = useMemo(() => {
    return formatDate(classInfo.create_date, "dd 'de' MMM 'de' yyyy");
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <Container shadow padding={4} margin={2} borderRadius={4}>
        <StatusLabel type={classInfo.active ? "OPEN" : "CLOSED"} />
        <Text preset="title" marginTop={2} marginBottom={2}>
          {classInfo.name}
        </Text>
        <Text preset="subtitle" marginBottom={2}>
          Professor {classInfo.teacher_name}
        </Text>
        <Text preset="subtitle">{formattedClassDate}</Text>
      </Container>
    </TouchableOpacity>
  );
};

export { ClassCard };
