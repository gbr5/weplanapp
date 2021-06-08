import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import Button from '../../../../components/Button';
import { useEvent } from '../../../../hooks/event';
import DefineEventName from '../../components/DefineEventName';

import {
  Container, Title, CloseButton, CloseIcon, EventName,
} from './styles';

interface IProps {
  handleCloseWindow: () => void;
}

const CreateEvent: React.FC<IProps> = ({
  handleCloseWindow,
}) => {
  const { createEvent } = useEvent();
  const [eventNameField, setEventNameField] = useState(true);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState('');

  const handleCreateEvent = useCallback(() => {
    const now = new Date();
    createEvent({
      date: new Date(now.setMonth(now.getMonth() + 1)),
      event_type: 'Social',
      isDateDefined: false,
      name: eventName,
    });
  }, [createEvent, eventName]);
  // }, []);

  const handleEventNameField = useCallback((props: boolean) => {
    setEventNameField(props);
  }, []);
  const handleEventName = useCallback((props: string) => {
    try {
      setLoading(true);
      setEventName(props);
      Alert.alert(props);
      handleEventNameField(false);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }, [handleEventNameField]);

  return (
    <Container>
      <CloseButton onPress={handleCloseWindow}>
        <CloseIcon name="x" size={24} />
      </CloseButton>
      <Title>Novo Evento</Title>

      {eventNameField ? (
        <DefineEventName
          loading={loading}
          closeWindow={() => handleEventNameField(false)}
          defineName={(name: string) => handleEventName(name)}
        />
      ) : (
        <>
          <EventName>{eventName}</EventName>
          <Button onPress={handleCreateEvent}>Criar Evento</Button>
        </>
      )}

    </Container>
  );
};

export default CreateEvent;
