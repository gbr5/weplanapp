import React from 'react';

import { useMyEvent } from '../../../../hooks/myEvent';
import { useEventVariables } from '../../../../hooks/eventVariables';

import MyEventsSection from '../../components/MyEventsSection';
import Header from '../../../../components/Header';
import ShortConfirmationWindow from '../../../../components/ShortConfirmationWindow';

import {
  Container,
  Body,
} from './styles';
import { useEvent } from '../../../../hooks/event';
import { useEventGuests } from '../../../../hooks/eventGuests';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';

const Dashboard: React.FC = () => {
  const {
    eventAsGuestConfirmationWindow,
    handleEventAsGuestConfirmationWindow,
    getEventsAsGuest,
  } = useEvent();
  const {
    selectedEventGuest,
    selectEventGuest,
  } = useEventVariables();
  const {
    deleteEventConfirmationWindow,
    handleDeleteEventConfirmationWindow,
    handleDeleteEvent,
  } = useMyEvent();
  const {
    editGuest,
  } = useEventGuests();
  const { selectedEvent } = useEventVariables();

  async function handleEditWePlanGuest() {
    try {
      handleEventAsGuestConfirmationWindow();
      await editGuest({
        ...selectedEventGuest,
        confirmed: !selectedEventGuest.confirmed,
      });
      selectEventGuest({} as IEventGuestDTO);
      await getEventsAsGuest();
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  }
  return (
    <>
      {deleteEventConfirmationWindow && selectedEvent && selectedEvent.id && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteEventConfirmationWindow}
          question="Deseja mesmo deletar o evento?"
          firstButtonLabel="Não deletar"
          firstFunction={handleDeleteEventConfirmationWindow}
          secondButtonLabel="Deletar"
          secondFunction={handleDeleteEvent}
        />
      )}
      {eventAsGuestConfirmationWindow && selectedEventGuest.id && (
        <ShortConfirmationWindow
          closeWindow={handleEventAsGuestConfirmationWindow}
          question={selectedEventGuest.confirmed ? `Deseja mesmo cancelar a sua presença no evento?` : `Deseja mesmo confirmar a sua presença no evento?`}
          firstButtonLabel={selectedEventGuest.confirmed ? 'Não Cancelar' : 'Não Confirmar'}
          firstFunction={handleEventAsGuestConfirmationWindow}
          secondButtonLabel={ selectedEventGuest.confirmed ? 'Cancelar' : 'Confirmar'}
          secondFunction={handleEditWePlanGuest}
        />
      )}
      <Container>
        <Header />
        <Body>
          <MyEventsSection />
        </Body>
      </Container>
    </>
  );
}
export default Dashboard;
