import React from 'react';
import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useEventTasks } from '../../../../../hooks/eventTasks';

import {
  Container,
  Description,
} from './styles';

export function EventTaskFollowersDescriptionWindow() {
  const {
    handleEventTaskFollowersDescriptionWindow,
  } = useEventTasks();

  return (
    <WindowContainer
      closeWindow={handleEventTaskFollowersDescriptionWindow}
      zIndex={25}
      top="5%"
      left="2%"
      height="85%"
      width="96%"
    >
        <Container>
          <WindowHeader overTitle="Descrição" title="Seguidores de Tarefas" />
          <Description>
            Os seguidores irão receber uma notificação via app e via e-mail sempre que a tarefa for atualizada.
          </Description>
          <Description>
            Apenas usuários com perfil WePlan poderão ser adicionados como seguidores.
          </Description>
          <Description>
            O seguidor também poderá interagir e visualizar todas as informações da tarefa.
          </Description>
          <Description>
            Por isto é muito importante que você adicione apenas pessoas que poderão visualizar as informações inseridas.
          </Description>
          <Description>
            Caso seja necessário, crie uma tarefa específica para a pessoa.
          </Description>
        </Container>
      <Button onPress={handleEventTaskFollowersDescriptionWindow}>Fechar</Button>
    </WindowContainer>
  );
}
