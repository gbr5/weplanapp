import React, { useState } from 'react';
import theme from '../../../../../global/styles/theme';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventOwners } from '../../../../../hooks/eventOwners';
import { useTransaction } from '../../../../../hooks/transactions';

import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  NotificationContainer,
  NotificationNumber,
  ConfirmationButton,
  RowContainer,
  RowTitle,
  Name,
  DateText,
  Icon,
  IconContainer,
  MenuButtonSection,
  MenuButton,
  MenuText,
  FooterContainer,
  NextTransactionContainer,
  TransactionRow,
  SectionBorder,
  SectionTitleLine,
  SectionTitle,
  TransactionText,
} from './styles';

export function OwnerButtonInfo() {
  const { selectedOwner } = useMyEvent();
  // const { } = useEventOwners();
  // const { eventDebitTransactions } = useTransaction();

  // const [loading, setLoading] = useState(false);

  return (
    <Container>
      {selectedOwner.description !== '' && (
        <Name>{selectedOwner.description}</Name>
      )}

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
{/*
      <SectionBorder /> */}

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {formatOnlyDateShort(String(selectedOwner.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
