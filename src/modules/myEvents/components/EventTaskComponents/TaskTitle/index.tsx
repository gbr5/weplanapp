import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import InlineFormField from '../../../../../components/InlineFormField';

import {
  Container,
  TaskLabel,
  TitleContainer,
  Title,
  TitleButton,
} from './styles';

export function TaskTitle(): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { selectedEventTask } = useEventVariables();
  const { updateTask } = useEventTasks();

  const [loading, setLoading] = useState(false);
  const [editTask, setEditTask] = useState(false);

  function handleEditTask() {
    setEditTask(!editTask);
  }

  async function handleUpdateTask(title: string): Promise<void> {
    try {
      setLoading(true);
      await updateTask({
        ...selectedEventTask.task,
        title,
      });
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
    >
      {loading ? <Feather size={24} name="loader" /> : (
        <TitleContainer>
          {editTask ? (
            <TitleButton onPress={handleEditTask}>
              <TaskLabel>Editar Tarefa:</TaskLabel>
                <InlineFormField
                  defaultValue={selectedEventTask.task.title}
                  placeholder={selectedEventTask.task.title}
                  handleOnSubmit={handleUpdateTask}
                  closeComponent={handleEditTask}
                />
            </TitleButton>
          ) : (
            <TitleButton onPress={handleEditTask}>
              <TaskLabel>Editar Tarefa:</TaskLabel>
                <Title>
                  {selectedEventTask.task.title}
                </Title>
            </TitleButton>
          )}
        </TitleContainer>
      )}
    </Container>
  );
};
