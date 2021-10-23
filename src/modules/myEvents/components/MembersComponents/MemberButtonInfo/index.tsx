import React, { useState } from 'react';
import { NotificationNumber } from '../../../../../components/NotificationNumber';
import { WPFriendContact } from '../../../../../components/WPFriendContact';
import IEventTransactionAgreementDTO from '../../../../../dtos/IEventTransactionAgreementDTO';
import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';
import IUserContactDTO from '../../../../../dtos/IUserContactDTO';

import theme from '../../../../../global/styles/theme';
import { useEventMembers } from '../../../../../hooks/eventMembers';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useFriends } from '../../../../../hooks/friends';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  DateText,
  Icon,
  IconContainer,
  MenuButtonSection,
  MenuButton,
  MenuText,
  FooterContainer,
  SectionBorder,
  ContactSection,
} from './styles';

export function MemberButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    selectedEventMember,
    selectedUserEventTasks,
    selectedEvent,
  } = useEventVariables();
  const { getSelectedUserEventTasks } = useMyEvent();
  const { handleSelectedUserContact } = useFriends();
  const {
    handlePayee,
    handlePayer,
    handleSelectedEventTransactionAgreements
  } = useTransaction();
  const {
    deleteEventMember,
    handleEventMemberTaskWindow,
    handleEventMemberTransactionAgreementsWindow,
  } = useEventMembers();

  const [accessContact, setAccessContact] = useState(false);

  function goToContact(data: IUserContactDTO) {
    handleSelectedUserContact(data);
    setAccessContact(!accessContact);
  }
  function closeContactWindow() {
    setAccessContact(false);
  }

  async function handleDeleteEventMember() {
    await deleteEventMember(selectedEventMember.id);
    closeContactWindow();
  }

  function handleMemberAgreementsWindow() {
    handlePayer({
      id: selectedEventMember.id,
      name: selectedEventMember.userEventMember.name,
    });
    handlePayee({
      id: selectedEvent.id,
      name: selectedEvent.name,
    });
    const agreements: IEventTransactionAgreementDTO[] = selectedEventMember.transactionAgreements.map(agreement => {
      const transactions: IEventTransactionDTO[] = agreement.transactions
        .map(({ transaction }) => {
        return {
          agreement_id: agreement.id,
          agreement_type: 'member',
          event_id: selectedEvent.id,
          transaction,
        };
      });
      const {
        amount,
        created_at,
        id,
        isCancelled,
        member_id,
        number_of_installments,
        updated_at,
      } = agreement;
      return {
        amount,
        created_at,
        event_id: selectedEvent.id,
        id,
        isCancelled,
        number_of_installments,
        participant_id: member_id,
        participant_type: 'member',
        transactions,
        updated_at,
      };
    });
    handleSelectedEventTransactionAgreements(agreements);
    handleEventMemberTransactionAgreementsWindow();
  }

  async function openMemberTasksWindow() {
    getSelectedUserEventTasks(selectedEventMember.userEventMember.id);
    handleEventMemberTaskWindow();
  }
  return (
    <Container>
      <SectionBorder />

      <MenuButtonSection horizontal >
        {/* <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={openMemberTasksWindow}
        >
          <MenuText>Perfil</MenuText>
          <IconContainer
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            color={theme.color.primary}
          >
            <Icon name="user" />
          </IconContainer>
        </MenuButton> */}

        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={openMemberTasksWindow}
        >
          <MenuText>Tarefas</MenuText>
          <IconContainer
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            color={theme.color.atention_light}
          >
            <NotificationNumber
              left="-20%"
              top="-40%"
              number={selectedUserEventTasks.length ?? 0}
            />
            <Icon name="bell" />
          </IconContainer>
        </MenuButton>

        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleMemberAgreementsWindow}
        >
          <MenuText>Transações</MenuText>
          <IconContainer
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            color={theme.color.title}
          >
            <Icon name="dollar-sign" />
          </IconContainer>
        </MenuButton>
        {/* <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
        >
          <MenuText>Notas</MenuText>
          <IconContainer
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            color={theme.color.info_light}
          >
            <Icon name="file-text" />
          </IconContainer>
        </MenuButton> */}
{/*
        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          >
          <MenuText>Contratos</MenuText>
          <IconContainer
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            color={theme.color.success_light}
          >
            <Icon name="lock" />
          </IconContainer>
        </MenuButton> */}

        {/* <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
        >
          <MenuText>Votos</MenuText>
          <IconContainer
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            color={theme.color.title}
          >
            <Icon name="star" />
          </IconContainer>
        </MenuButton> */}

        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleDeleteEventMember}
        >
          <MenuText>Deletar</MenuText>
          <IconContainer
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            color={theme.color.atention_light}
          >
            <Icon name="trash-2" />
          </IconContainer>
        </MenuButton>

        {/* <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
        >
          <MenuText>Mais</MenuText>
          <IconContainer
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            color={theme.color.primary_light}
          >
            <Icon name="plus" />
          </IconContainer>
        </MenuButton> */}

      </MenuButtonSection>

      <SectionBorder />

      {selectedEventMember.userEventMember.userContacts.length > 0 &&
        <>
          <SectionBorder />
          <ContactSection horizontal>
            {selectedEventMember.userEventMember.userContacts.map(contact => {
              return (
                <WPFriendContact goToContact={() => goToContact(contact)} contact={contact} key={contact.id} />
              );
            })}
          </ContactSection>
        </>
      }
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
