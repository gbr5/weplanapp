import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput } from 'react-native';
import { addDays } from 'date-fns';

import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import Input from '../../../../../components/Input';

import {
  Container,
  Title,
  FormQuestion,
} from './styles';
import IPriorityButton from '../../../../../dtos/IPriorityButtonDTO';
import IStatusButton from '../../../../../dtos/IStatusButtonDTO';

interface IFormData {
  title: string;
}

interface IProps {
  closeWindow: () => void;
}

const NewTaskForm: React.FC<IProps> = ({
  closeWindow,
}) => {
  const { selectedEvent } = useMyEvent();
  const { createTask, loading } = useEventTasks();
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<TextInput>(null);

  const [due_date, setDueDate] = useState(addDays(new Date(), 3));
  const [selectedPriority, setPriority] = useState<IPriorityButton>();
  const [selectedStatus, setStatus] = useState<IStatusButton>();

  const handleSubmit = useCallback(async ({
    title,
  }: IFormData) => {
    if (!selectedPriority) return
    if (!selectedStatus) return
    await createTask({
      event_id: selectedEvent.id,
      title,
      due_date,
      priority: selectedPriority.priority,
      status: selectedStatus.status,
    });
    closeWindow();
  }, [closeWindow, createTask]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      height="80%"
      left="2%"
      top="10%"
      width="96%"
      zIndex={11}
    >
      <Container>
        <Title>Nova Tarefa</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormQuestion>Título</FormQuestion>
          <Input
            name="title"
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Defina o título da tarefa"
            returnKeyType="next"
            onSubmitEditing={() => {
              inputRef.current?.focus();
            }}
          />
          <FormQuestion></FormQuestion>
          <Input
            name="last_name"
            ref={inputRef}
            autoCorrect={false}
            autoCapitalize="words"
            icon="user"
            placeholder="Sobrenome"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
        </Form>
      </Container>
      <Button
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
};

export default NewTaskForm;
