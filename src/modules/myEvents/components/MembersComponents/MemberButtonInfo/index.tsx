import React from 'react';

import theme from '../../../../../global/styles/theme';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  NotificationContainer,
  NotificationNumber,
  DateText,
  Icon,
  IconContainer,
  MenuButtonSection,
  MenuButton,
  MenuText,
  FooterContainer,
  SectionBorder,
} from './styles';

export function MemberButtonInfo() {
  const { selectedEventMember } = useEventVariables();

  return (
    <Container>
      <SectionBorder />

      <MenuButtonSection horizontal >

        <MenuButton>
          <MenuText>Tarefas</MenuText>
          <IconContainer
            color={theme.color.atention_light}
          >
            <NotificationContainer>
              <NotificationNumber>0</NotificationNumber>
            </NotificationContainer>
            <Icon name="bell" />
          </IconContainer>
        </MenuButton>

        <MenuButton>
          <MenuText>Transações</MenuText>
          <IconContainer
            color={theme.color.title}
          >
            <Icon name="dollar-sign" />
          </IconContainer>
        </MenuButton>
        <MenuButton>
          <MenuText>Notas</MenuText>
          <IconContainer
            color={theme.color.info_light}
          >
            <Icon name="file-text" />
          </IconContainer>
        </MenuButton>

        <MenuButton>
          <MenuText>Contratos</MenuText>
          <IconContainer
            color={theme.color.success_light}
          >
            <Icon name="lock" />
          </IconContainer>
        </MenuButton>

        <MenuButton>
          <MenuText>Votos</MenuText>
          <IconContainer
            color={theme.color.title}
          >
            <Icon name="star" />
          </IconContainer>
        </MenuButton>

        <MenuButton>
          <MenuText>Mais</MenuText>
          <IconContainer
            color={theme.color.primary_light}
          >
            <Icon name="plus" />
          </IconContainer>
        </MenuButton>

      </MenuButtonSection>

      <SectionBorder />

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {formatOnlyDateShort(String(selectedEventMember.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
