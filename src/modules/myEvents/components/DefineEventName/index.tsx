import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import { Container, Title } from './styles';

interface IProps {
  defineName: (name: string) => void;
  closeWindow: () => void;
  loading: boolean;
}

interface FormData {
  name: string;
}

const DefineEventName: React.FC<IProps> = ({
  defineName,
  closeWindow,
  loading,
}) => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(({ name }: FormData) => {
    defineName(name);
  }, [defineName]);
  return (
    <Container>
      <Title>Defina o nome do evento</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input icon="user" name="name" />
        <Button
          loading={loading}
          onPress={() => formRef.current?.submitForm()}
        >
          Salvar
        </Button>
      </Form>
      <Button onPress={closeWindow}>Cancelar</Button>
    </Container>
  );
};

export default DefineEventName;
