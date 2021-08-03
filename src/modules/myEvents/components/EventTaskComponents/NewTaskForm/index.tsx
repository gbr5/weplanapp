import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { addDays } from 'date-fns';
import { TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';

import theme from '../../../../../global/styles/theme';

import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import formatOnlyTime from '../../../../../utils/formatOnlyTime';

import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import Input from '../../../../../components/Input';
import { SelectTaskPriorityComponent } from '../SelectTaskPriorityComponent';

import { FormContainer, KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import {
  Container,
  Title,
  FormQuestion,
  DateContainer,
  DateText,
  DateButton,
  TimeText,
  Underline,
} from './styles';
import { FormButton } from '../../../../../components/FormButton';
import { WindowHeader } from '../../../../../components/WindowHeader';

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
      top="5%"
      left="2%"
      height="90%"
      width="96%"
      zIndex={15}
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader title="Nova Tarefa" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <FormQuestion>Título</FormQuestion>
                <Input
                  placeholderTextColor={theme.color.secondary}
                  name="title"
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholder="Defina o título da tarefa"
                  returnKeyType="next"
                />
              </Form>
              <SelectTaskPriorityComponent
                handleTaskPriority={(data: 'low' | 'neutral' | 'high') => selectTaskPriority(data)}
                selectedPriority={selectedPriority}
              />
              <FormQuestion>Data prevista</FormQuestion>
              <DateContainer>
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
              </DateContainer>
            </Container>
          </FormContainer>
        </TouchableWithoutFeedback>
        <FormButton
          loading={loading}
          handleSubmit={() => formRef.current?.submitForm()}
          text="Salvar"
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
};

export default NewTaskForm;
