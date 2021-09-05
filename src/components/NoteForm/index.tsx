import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { TextInput } from 'react-native';
import Button from '../Button';

import {
  Container,
  TextAreaContainer,
  TextAreaInput,
  NumberOfCharacters,
  SendButton,
  SendButtonText,
} from './styles';

interface IProps {
  placeholder: string;
  handleNote: (e: string) => void;
}

export function NoteForm({
  placeholder,
  handleNote,
}: IProps) {
  const textAreaRef = useRef<TextInput>(null);
  const [textValue, setTextValue] = useState(placeholder);
  const [numberOfLines, setNumberOfLines] = useState(1);

  function submitNote() {
    handleNote(textValue);
    setTextValue('');
    textAreaRef.current?.clear();
  }

  useEffect(() => {
    const numberLines = Math.ceil(textValue.length/30);
    setNumberOfLines(numberLines);
  }, [numberOfLines, textValue]);

  return (
    <>
      <Container>
        <TextAreaContainer>
          <TextAreaInput
            ref={textAreaRef}
            multiline={true}
            numberOfLines={numberOfLines}
            underlineColorAndroid="transparent"
            defaultValue={placeholder}
            onChangeText={setTextValue}
            autoCorrect={false}
            autoCapitalize="sentences"
          />
          <NumberOfCharacters>{textValue.length}</NumberOfCharacters>
        </TextAreaContainer>
        {textValue !== '' && (
          <SendButton onPress={submitNote}>
            <SendButtonText>
              Enviar
            </SendButtonText>
          </SendButton>
        )}
      </Container>
    </>
  );
};
