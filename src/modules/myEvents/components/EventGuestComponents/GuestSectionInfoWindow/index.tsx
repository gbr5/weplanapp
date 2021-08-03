import React, { useState } from 'react';

import { useEventGuests } from '../../../../../hooks/eventGuests';

import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';

import {
  Container,
  Title,
  TextOption,
} from './styles';

export function GuestSectionInfoWindow() {
  const { handleGuestSectionInfoWindow } = useEventGuests();

  return (
    <WindowContainer
      closeWindow={handleGuestSectionInfoWindow}
      zIndex={15}
      top="5%"
      left="2%"
      height="90%"
      width="96%"
    >
      <Container>
        <WindowHeader overTitle="Descrição" title="Convidados" />
        {/* <Title>Convidados do evento</Title>
        <Underline /> */}
        <Title>
          Você pode adicionar convidados através de:
        </Title>
        <TextOption>
          Contatos do telefone
        </TextOption>
        <TextOption>
          Contatos do Facebook/Instagran
        </TextOption>
        <TextOption>
          Contatos do próprio WePlan
        </TextOption>
        <TextOption>
          Ou adicionar manualmente
        </TextOption>

        {/* <Title>Convidar para o evento</Title>
        <Underline /> */}
        <Title>
          Você também possui diversas formas para convidar como:
        </Title>
        <TextOption>
          E-mail em massa
        </TextOption>
        <TextOption>
          Whatsapp
        </TextOption>
        <TextOption>
          Telegram
        </TextOption>
        <Title>
          Os seus convidados podem interagir através do seu site!
        </Title>
        <TextOption>
          Podem confirmar a presença, acessar lista de presentes e muito mais.
        </TextOption>
      </Container>
      <Button onPress={handleGuestSectionInfoWindow} >Fechar</Button>
    </WindowContainer>
  );
}
