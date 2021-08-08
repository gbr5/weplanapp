import React from 'react';
import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useEventOwners } from '../../../../../hooks/eventOwners';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  Container,
  Description,
  Title,
  Space,
} from './styles';

export function SectionDescriptionWindow() {
  const {
    currentSection,
    handleSectionDescriptionWindow,
  } = useMyEvent();

  return (
    <WindowContainer
      closeWindow={handleSectionDescriptionWindow}
      zIndex={5}
      top="5%"
      left="2%"
      height="85%"
      width="96%"
    >
      {currentSection === 'Suppliers' && (
        <Container>
          <WindowHeader overTitle="Descrição" title="Fornecedores" />
          <Description>
            Você pode controlar as transações e contratos por fornecedor, adicionar notas, e arquivos, como pdf e imagens.
          </Description>
          <Description>
            Você também pode selecionar a categoria do fornecedor, e assim otimizar seus relatórios e análises.
          </Description>
        </Container>
      )}
      {currentSection === 'Tasks' && (
        <Container>
          <WindowHeader overTitle="Descrição" title="Tarefas" />

          <Title>
            As tarefas possuem
          </Title>

          <Space />

          <Title>Status</Title>
          <Description>
            Informa se a tarefa ainda não foi iniciada, se está em execução ou se já foi finalizada.
          </Description>

          <Space />

          <Title>Prioridade</Title>
          <Description>
            Informa a urgência da tarefa, podendo ser baixa, neutra ou alta.
          </Description>

          <Space />

          <Title>Notas</Title>
          <Description>
            Onde fica armazenado o histórico da tarefa, e onde os anfitriões poderão fazer anotações a respeito da tarefa
          </Description>

        </Container>
      )}
      {/* {currentSection === 'Financial' && ()} */}
      {currentSection === 'Guests' && (
        <Container>
          <WindowHeader overTitle="Descrição" title="Convidados" />

          <Title>
            Você pode adicionar convidados através de:
          </Title>
          <Description>
            Contatos do telefone
          </Description>
          <Description>
            Contatos do Facebook/Instagran
          </Description>
          <Description>
            Contatos do próprio WePlan
          </Description>
          <Description>
            Ou adicionar manualmente
          </Description>
          <Title>
            Você também possui diversas formas para convidar como:
          </Title>
          <Description>
            E-mail em massa
          </Description>
          <Description>
            Whatsapp
          </Description>
          <Description>
            Telegram
          </Description>
          <Title>
            Os seus convidados podem interagir através do seu site!
          </Title>
          <Description>
            Podem confirmar a presença, acessar lista de presentes e muito mais.
          </Description>
        </Container>
      )}

      {currentSection === 'Owners' && (
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
      )}
      {currentSection === 'Members' && (
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
      )}

      <Button onPress={handleSectionDescriptionWindow}>Fechar</Button>
    </WindowContainer>
  );
}
