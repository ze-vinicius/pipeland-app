import { useTheme } from "@react-navigation/native";
import React, { useRef } from "react";
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { Text } from "../";
import { Container } from "../container";
// import { Container } from './styles';

interface TextEditorProps {
  onChange: (text: string) => void;
  onCursorPosition?: ((offsetY: number) => void) | undefined;
  label?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  onChange,
  label,
  onCursorPosition,
}) => {
  const ritchTextRef = useRef<RichEditor | null>(null);
  const theme = useTheme();

  const editorInitializedCallback = () => {
    ritchTextRef.current?.registerToolbar(function (items) {});
  };

  //   const handleCursorPosition = (scrollY: string) => {
  //     // Positioning scroll bar
  //     scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
  // }

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
          selectedIconTint={theme.colors.primary}
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
