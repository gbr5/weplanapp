import React, {
  useCallback,
  useState,
  useRef,
  useMemo,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { addMonths } from 'date-fns';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import WindowContainer from '../../../../components/WindowContainer';
import IEventDTO from '../../../../dtos/IEventDTO';
import { useEvent } from '../../../../hooks/event';
import { useMyEvent } from '../../../../hooks/myEvent';
import { SelectEventType } from '../SelectEventType';

import {
  Container,
  Title,
} from './styles';

interface IProps {
  handleCloseWindow: () => void;
}

interface IFormProps {
  name: string;
}

const CreateEvent: React.FC<IProps> = ({
  handleCloseWindow,
}) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { createEvent } = useEvent();
  const { selectEvent } = useMyEvent();
  const [selectEventTypeWindow, setSelectEventTypeWindow] = useState(true);
  const [event_type, setEventType] = useState('');
  const [loading, setLoading] = useState(false);

  function handleEventType(type: string) {
    setEventType(type);
    setSelectEventTypeWindow(false);
  }

  function openEventTypeWindow() {
    setSelectEventTypeWindow(true);
  }

  const handleCreateEvent = useCallback(async ({ name }: IFormProps) => {
    try {
      setLoading(true);
      selectEvent({} as IEventDTO);
      const now = new Date();
      const event = await createEvent({
        date: new Date(addMonths(now, 1)),
        event_type,
        isDateDefined: false,
        name,
      });
      selectEvent(event);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      handleCloseWindow();
      navigation.navigate('MyEvent');
    }
  }, [createEvent, navigation, handleCloseWindow, event_type, selectEvent]);

  const eventType = useMemo(() => {
    if (event_type === 'Wedding') return 'Casamento';
    if (event_type === 'Prom') return 'Formatura';
    return 'Outros';
  }, [event_type]);

  return (
    <WindowContainer
      closeWindow={handleCloseWindow}
      height="80%"
      width="100%"
      left="0%"
      top="10%"
      zIndex={15}
    >
      <Container>
        <Title>Novo Evento</Title>

        {selectEventTypeWindow ? (
          <SelectEventType
            eventType={event_type}
            selectEventType={(e: string) => handleEventType(e)}
          />
        ) : (
          <>
            <Button
              onPress={openEventTypeWindow}
            >
              {eventType}
            </Button>
            <Form ref={formRef} onSubmit={handleCreateEvent}>
              <Input
                name="name"
                autoCapitalize="words"
                placeholder="Defina o nome do evento"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button
                loading={loading}
                onPress={() => formRef.current?.submitForm()}
              >
                Criar evento
              </Button>
            </Form>
          </>
        )}
      </Container>

    </WindowContainer>
  );
};

export default CreateEvent;
