import React from 'react';
import MyEventsSection from '../../components/MyEventsSection';
import Header from '../../../../components/Header';
import {
  Container,
  Body,
} from './styles';
import { useMyEvent } from '../../../../hooks/myEvent';
import ShortConfirmationWindow from '../../../../components/ShortConfirmationWindow';

const Dashboard: React.FC = () => {
  const {
    deleteEventConfirmationWindow,
    handleDeleteEventConfirmationWindow,
    handleDeleteEvent,
    selectedEvent,
  } = useMyEvent();
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
