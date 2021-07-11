import React, { useState } from 'react';
import { useEffect } from 'react';
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
  const [textValue, setTextValue] = useState('');
  const [numberOfLines, setNumberOfLines] = useState(1);

  function submitNote() {
    // if (textValue === '') return;
    handleNote(textValue);
    setTextValue('');
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
            multiline={true}
            numberOfLines={numberOfLines}
            underlineColorAndroid="transparent"
            placeholder={placeholder}
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
