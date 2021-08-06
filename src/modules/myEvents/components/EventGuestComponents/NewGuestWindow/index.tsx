import React from 'react';

import { useEventGuests } from '../../../../../hooks/eventGuests';

import WindowContainer from '../../../../../components/WindowContainer';

import {
  Container,
  Button,
  ButtonTitle,
} from './styles';
import { WindowHeader } from '../../../../../components/WindowHeader';
import theme from '../../../../../global/styles/theme';
import { useUserContacts } from '../../../../../hooks/userContacts';

export function NewGuestWindow() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow;
  const { handleNewGuestForm, handleNewGuestWindow } = useEventGuests();
  const {
    getUserMobileContacts,
    handleSelectMobileContactsWindow,
  } = useUserContacts();

  async function handleNewMobileGuest() {
    await getUserMobileContacts();
    handleSelectMobileContactsWindow(true);
  }

  return (
    <WindowContainer
      closeWindow={handleNewGuestWindow}
      zIndex={10}
      top="10%"
      left="2%"
      height="45%"
      width="96%"
    >
      <Container>
        <WindowHeader title="Novo(a) Convidado(a)" />
        <Button
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
          onPress={handleNewMobileGuest}
        >
          <ButtonTitle>Selecionar do celular</ButtonTitle>
        </Button>
        <Button
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
          onPress={handleNewGuestForm}
        >
          <ButtonTitle>Criar manualmente</ButtonTitle>
        </Button>
      </Container>
    </WindowContainer>
  );
};
