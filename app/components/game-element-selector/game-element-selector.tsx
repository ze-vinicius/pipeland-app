import { getSnapshot } from "mobx-keystone";
import React, { useEffect, useState } from "react";

import { Icon } from "..";
import { useStores } from "../../store";
import { GameElement } from "../../store/game-element-store/game-element";
import { Button } from "../button";
import { Container } from "../container";
import { IconButton } from "../icon-button";
import { InputSelector } from "../input-selector/input-selector";
import { PipelandFlexProps, PipelandViewProps } from "../pipeland-system";
import { Text } from "../text";

interface GameElementSelectorProps
  extends PipelandFlexProps,
    PipelandViewProps {
  type?: "REWARD" | "PENALTY";
  onChange: (selectedElements: any) => void;
  defaultValue?: Array<{ id: string }>;
}

interface ElementItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  elementValue: number;
}

const GameElementSelector: React.FC<GameElementSelectorProps> = ({
  type = "REWARD",
  onChange,
  defaultValue,
  ...customStyle
}) => {
  const { gameElementsStore } = useStores();

  const formatElement = (element: GameElement) => ({
    elementValue: element.value,
    ...getSnapshot(element),
    label: element.name,
    value: element.id,
    icon: element.imageUrl,
  });

  const gameElements =
    type === "REWARD"
      ? gameElementsStore.gameRewards
      : gameElementsStore.gamePenalties;

  const elements: ElementItem[] = gameElements
    .filter(
      (element) =>
        element.name !== "attendance anchor" && element.name !== "bullet"
    )
    .map(formatElement);

  const [selectedElements, setSelectedElements] = useState<Array<ElementItem>>(
    !!defaultValue
      ? elements.filter((el) => {
          const hasElement = defaultValue.find(
            (element) => element.id === el.id
          );

          if (!!hasElement) {
            return true;
          }

          return false;
        })
      : [elements[0]]
  );
  const [selectorsQty, setSelectorsQty] = useState(
    () => selectedElements.length
  );

  const [elementsValue, setElementsValue] = useState(elements[0].elementValue);

  const elementHasFixedValue = (elementName: string) => {
    return [
      "coin",
      "mid mushroom",
      "strawberry",
      "star",
      "red mushroom",
    ].includes(elementName);
  };

  const handleChangeGameElement = (element: any, selectorIndex: number) => {
    const newSelectedElements = [...selectedElements];

    newSelectedElements[selectorIndex] = element;

    setSelectedElements(newSelectedElements);
  };

  useEffect(() => {
    setElementsValue(
      selectedElements.reduce((acc, curr) => {
        if (elementHasFixedValue(curr.name)) {
          return acc + curr.elementValue;
        }

        return acc;
      }, 0)
    );
    onChange(selectedElements);
  }, [selectedElements]);

  const handleAddNewElement = () => {
    const newElementQty = selectorsQty + 1;

    const newSelectedElements = [...selectedElements];

    newSelectedElements[selectorsQty] = elements[0];

    setSelectedElements(newSelectedElements);

    setSelectorsQty(newElementQty);
  };

  const handleDeleteSelector = (index: number) => {
    const newSelectedElements = [...selectedElements];

    newSelectedElements.splice(index, 1);

    setSelectedElements(newSelectedElements);

    setSelectorsQty(selectorsQty - 1);
  };

  return (
    <Container {...customStyle}>
      <Container
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {type === "REWARD" ? (
          <>
            <Text preset="title">Recompensas</Text>
            <Container flexDirection="row" alignItems="center">
              <Icon name="coin" marginRight="2" size={14} />
              <Text>{elementsValue}</Text>
            </Container>
          </>
        ) : (
          <Text preset="title">Penalidades</Text>
        )}
      </Container>
      {Array.from(
        {
          length: selectorsQty,
        },
        (index) => index
      ).map((_, index) => (
        <Container
          key={index}
          flexDirection="row"
          alignItems="center"
          marginTop={4}
        >
          <InputSelector
            flex={1}
            onChange={(item: any) => handleChangeGameElement(item, index)}
            selected={selectedElements[index]}
            options={elements}
          />
          <IconButton
            marginLeft={2}
            icon="delete"
            padding={1}
            iconSize={24}
            preset="secondary"
            onPress={() => handleDeleteSelector(index)}
          />
        </Container>
      ))}
      <Button
        icon="plus"
        preset="secondary"
        marginTop={4}
        onPress={handleAddNewElement}
      >
        Novo elemento
      </Button>
    </Container>
  );
};

export { GameElementSelector };
