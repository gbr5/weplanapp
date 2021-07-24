import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
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
  DateText,
  DateButton,
  TimeText,
  Underline,
} from './styles';

import { SelectTaskPriorityComponent } from '../SelectTaskPriorityComponent';
import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import formatOnlyTime from '../../../../../utils/formatOnlyTime';

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
  const {
    createTask,
    loading,
    taskDate,
    handleSelectTaskDateWindow,
    handleSelectTaskTimeWindow,
  } = useEventTasks();
  const formRef = useRef<FormHandles>(null);

  const [selectedPriority, setPriority] = useState<'low' | 'neutral' | 'high'>('low');

  const handleSubmit = useCallback(async ({
    title,
  }: IFormData) => {
    await createTask({
      event_id: selectedEvent.id,
      title,
      due_date: taskDate,
      priority: selectedPriority,
      status: 'not started',
    });
    formRef.current?.clearField;
    closeWindow();
  }, [closeWindow, createTask]);

  function selectTaskPriority(data: 'low' | 'neutral' | 'high') {
    setPriority(data);
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="10%"
      left="2%"
      height="75%"
      width="96%"
      zIndex={11}
    >
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Nova Tarefa</Title>
          <Underline />
          <FormQuestion>Título</FormQuestion>
          <Input
            name="title"
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Defina o título da tarefa"
            returnKeyType="next"
          />
          <SelectTaskPriorityComponent
            handleTaskPriority={(data: 'low' | 'neutral' | 'high') => selectTaskPriority(data)}
            selectedPriority={selectedPriority}
          />
          <DateButton
            onPress={handleSelectTaskDateWindow}
          >
            <DateText>{formatOnlyDate(String(taskDate))}</DateText>
          </DateButton>
          <DateButton
            onPress={handleSelectTaskTimeWindow}
          >
            <TimeText>{formatOnlyTime(String(taskDate))}</TimeText>
          </DateButton>
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
