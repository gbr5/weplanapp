import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';

import theme from '../../../../../global/styles/theme';

import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import formatOnlyTime from '../../../../../utils/formatOnlyTime';

import WindowContainer from '../../../../../components/WindowContainer';
import Input from '../../../../../components/Input';
import { SelectTaskPriorityComponent } from '../SelectTaskPriorityComponent';
import { FormButton } from '../../../../../components/FormButton';
import { WindowHeader } from '../../../../../components/WindowHeader';

import { FormContainer, KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import {
  Container,
  FormQuestion,
  DateContainer,
  DateText,
  DateButton,
  TimeText,
} from './styles';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useEventOwners } from '../../../../../hooks/eventOwners';
import { useEventMembers } from '../../../../../hooks/eventMembers';
import { useAuth } from '../../../../../hooks/auth';

interface IFormData {
  title: string;
}

interface IProps {
  closeWindow: () => void;
}

const NewTaskForm: React.FC<IProps> = ({
  closeWindow,
}) => {
  const { user } = useAuth();
  const {
    selectedEvent,
    selectedEventSupplier,
    selectedEventMember,
    selectedEventOwner,
  } = useEventVariables();
  const { createEventWePlanSupplierTaskWindow } = useEventSuppliers();
  const { createEventOwnerTaskWindow } = useEventOwners();
  const { createEventMemberTaskWindow } = useEventMembers();
  const {
    createEventTask,
    loading,
    taskDate,
    handleSelectTaskDateWindow,
    handleSelectTaskTimeWindow,
    createEventOwnerTask,
    createEventMemberTask,
    createEventWePlanSupplierTask,
  } = useEventTasks();
  const formRef = useRef<FormHandles>(null);

  const [selectedPriority, setPriority] = useState<'low' | 'neutral' | 'high'>('low');

  const handleSubmit = useCallback(async ({
    title,
  }: IFormData) => {
    if (
      selectedEventOwner &&
      selectedEventOwner.id &&
      selectedEventOwner.userEventOwner.id !== user.id &&
      createEventOwnerTaskWindow
    ) {
      await createEventOwnerTask({
        event_id: selectedEvent.id,
        owner_id: selectedEventOwner.userEventOwner.id,
        title,
        due_date: taskDate,
        priority: selectedPriority,
        status: 'not started',
      });
    } else if (
      selectedEventMember &&
      selectedEventMember.id &&
      selectedEventMember.userEventMember.id !== user.id &&
      createEventMemberTaskWindow
    ) {
      await createEventMemberTask({
        event_id: selectedEvent.id,
        member_id: selectedEventMember.userEventMember.id,
        title,
        due_date: taskDate,
        priority: selectedPriority,
        status: 'not started',
      });
    } else if (
      selectedEventSupplier &&
      selectedEventSupplier.id &&
      selectedEventSupplier.weplanUser &&
      selectedEventSupplier.eventWeplanSupplier &&
      selectedEventSupplier.eventWeplanSupplier.weplanEventSupplier &&
      selectedEventSupplier.eventWeplanSupplier.weplanEventSupplier.id &&
      createEventWePlanSupplierTaskWindow
    ) {
      await createEventWePlanSupplierTask({
        event_id: selectedEvent.id,
        supplier_id: selectedEventSupplier.eventWeplanSupplier.weplanEventSupplier.id,
        title,
        due_date: taskDate,
        priority: selectedPriority,
        status: 'not started',
      });
    } else {
      await createEventTask({
        event_id: selectedEvent.id,
        title,
        due_date: taskDate,
        priority: selectedPriority,
        status: 'not started',
      });
    }

    formRef.current?.clearField;
    closeWindow();
  }, [closeWindow, createEventTask]);

  function selectTaskPriority(data: 'low' | 'neutral' | 'high') {
    setPriority(data);
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="5%"
      left="2%"
      height="85%"
      width="96%"
      zIndex={15}
      backdropZIndex={14}
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
                  onSubmitEditing={() => Keyboard.dismiss()}
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
