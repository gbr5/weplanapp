import React from 'react';
import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useEventOwners } from '../../../../../hooks/eventOwners';

import {
  Container,
  Description,
  Space,
} from './styles';

export function OwnerDescriptionWindow() {
  const { handleOwnerDescriptionWindow } = useEventOwners();
  return (
    <WindowContainer
      closeWindow={handleOwnerDescriptionWindow}
      zIndex={5}
      top="5%"
      left="2%"
      height="85%"
      width="96%"
    >
      <Container>
        <WindowHeader overTitle="Descrição" title="Anfitriões" />
        <Description>
          Anfitriões são os donos do evento.
        </Description>
        <Description>
          Possuem acesso completo à plataforma,
        </Description>
        <Description>
          podendo editar tudo e ter acesso a todas as informações.
        </Description>
        <Space />
        <Description>
          O Anfritião Master é a pessoa que criou o evento.
        </Description>
        <Description>
          É a única pessoa que pode deletar, publicar ou alterar o estatus do evento.
        </Description>
      </Container>

      <Button onPress={handleOwnerDescriptionWindow}>Fechar</Button>
    </WindowContainer>
  );
}
