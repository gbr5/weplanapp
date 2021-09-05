import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import InlineFormField from '../../../../../components/InlineFormField';
import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

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
  const { selectedTask } = useMyEvent();
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
        ...selectedTask,
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
                  defaultValue={selectedTask.title}
                  placeholder={selectedTask.title}
                  handleOnSubmit={handleUpdateTask}
                  closeComponent={handleEditTask}
                />
            </TitleButton>
          ) : (
            <TitleButton onPress={handleEditTask}>
              <TaskLabel>Editar Tarefa:</TaskLabel>
                <Title>
                  {selectedTask.title}
                </Title>
            </TitleButton>
          )}
        </TitleContainer>
      )}
    </Container>
  );
};
