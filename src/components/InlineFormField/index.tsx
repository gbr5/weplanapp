import React, { useCallback, useRef, useState } from 'react';

import { Container, Button, Icon } from './styles';
import CloseButton from '../CloseButton';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import theme from '../../global/styles/theme';
import Input from '../Input';

interface IFormParams {
  name: string;
}

interface IProps {
  defaultValue: string;
  placeholder: string;
  handleOnSubmit: (e: string) => void;
  closeComponent?: Function;
}

const InlineFormField: React.FC<IProps> = ({
  defaultValue,
  handleOnSubmit,
  placeholder,
  closeComponent,
}) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const formRef = useRef<FormHandles>(null);

  function handleSubmit({ name }: IFormParams) {
    console.log({name});
    if (name !== '' && name !== defaultValue) {
      handleOnSubmit(name);
    }
    closeComponent && closeComponent();
  }

  return (
    <Container>
      {closeComponent && (
        <CloseButton style={{ right: '0%', top: '0%' }} closeFunction={() => closeComponent()} />
      )}
      <Form style={{ flex: 1 }} ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholderTextColor={theme.color.text1}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onSubmitEditing={() => formRef.current?.submitForm()}
          returnKeyType="send"
          returnKeyLabel="Enviar"
        />
      </Form>

      <Button
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 3,
        }}
        onPress={() => formRef.current?.submitForm()}
      >
        <Icon name="check" />
      </Button>
    </Container>
  );
};

export default InlineFormField;
