import React, { useRef } from "react";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { useTheme } from "styled-components";
import { Text } from "../text";
import { Container } from "../container";

interface TextEditorProps {
  onChange: (text: string) => void;
  onCursorPosition?: ((offsetY: number) => void) | undefined;
  label?: string;
  defaultValue?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  onChange,
  label,
  defaultValue,
  onCursorPosition,
}) => {
  const ritchTextRef = useRef<RichEditor | null>(null);
  const theme = useTheme();

  const editorInitializedCallback = () => {
    ritchTextRef.current?.registerToolbar(function (items) {});
  };

  return (
    <Container>
      {!!label && (
        <Text preset="inputLabel" marginBottom={2}>
          {label}
        </Text>
      )}

      <Container borderColor="line" borderWidth={2} borderRadius={4}>
        <RichToolbar
          editor={ritchTextRef}
          selectedIconTint={theme.color.primary}
          actions={[
            actions.undo,
            actions.redo,
            actions.setBold,
            actions.setItalic,
            actions.setStrikethrough,
            actions.insertBulletsList,
          ]}
        />
        <RichEditor
          initialContentHTML={defaultValue}
          ref={ritchTextRef}
          useContainer={true}
          editorInitializedCallback={editorInitializedCallback}
          onChange={onChange}
          initialHeight={250}
          onCursorPosition={onCursorPosition}
        />
      </Container>
    </Container>
  );
};

export { TextEditor };
