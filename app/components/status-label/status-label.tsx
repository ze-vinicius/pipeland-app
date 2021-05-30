import React from "react";
import { useTheme } from "styled-components/native";
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
  mb = 0,
  mt = 0,
  mr = 0,
  ml = 0,
}) => {
  const { spacing } = useTheme();

  const overrideStyle = [
    {
      marginBottom: Number(spacing[mb]),
      marginTop: Number(spacing[mt]),
      marginRight: Number(spacing[mr]),
      marginLeft: Number(spacing[ml]),
    },
  ];

  return (
    <Container style={overrideStyle}>
      <LabelText>{labelTypes[type].text}</LabelText>
    </Container>
  );
};
