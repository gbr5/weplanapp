import React from 'react';
import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useEventMembers } from '../../../../../hooks/eventMembers';

import {
  Container,
  Description,
  Space,
} from './styles';

export function MemberDescriptionWindow() {
  const { handleMemberDescriptionWindow } = useEventMembers();
  return (
    <WindowContainer
      closeWindow={handleMemberDescriptionWindow}
      zIndex={5}
      top="5%"
      left="2%"
      height="90%"
      width="96%"
    >
      <Container>
        <WindowHeader overTitle="Descrição" title="Membros" />
        <Description>
          Membros são partes interessadas no evento.
        </Description>
        <Description>
          Possuem acesso à plataforma,
        </Description>
        <Description>
          podendo visualizar quase todas as informações,
        </Description>
        <Description>
          possuindo apenas restrições com relação a informações privadas de outras pessoas.
        </Description>
        <Space />
        <Description>
          Podem alterar apenas informações que lhe dizem respeito, como
          seus convidados, e suas informações financeiras.
        </Description>
      </Container>

      <Button onPress={handleMemberDescriptionWindow}>Fechar</Button>
    </WindowContainer>
  );
}
