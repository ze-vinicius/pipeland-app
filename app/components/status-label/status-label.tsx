import React from "react";
import { useTheme } from "styled-components/native";
import { getStyle } from "../component-base";
import { StatusLabelProps } from "./status-label.props";

import { Container, LabelText } from "./status-label.styles";

const labelTypes = {
  corrected: {
    text: "Corrigida",
    color: "",
  },
  opened: {
    text: "Aberta",
    color: "",
  },
  closed: {
    text: "encerrada",
    color: "",
  },
};

export const StatusLabel: React.FC<StatusLabelProps> = ({
  type,
  marginBottom = 0,
  marginRight = 0,
  marginLeft = 0,
  marginTop = 0,
}) => {
  const overrideStyle = getStyle({
    marginBottom,
    marginRight,
    marginLeft,
    marginTop,
  });

  return (
    <Container style={overrideStyle}>
      <LabelText>{labelTypes[type].text}</LabelText>
    </Container>
  );
};
