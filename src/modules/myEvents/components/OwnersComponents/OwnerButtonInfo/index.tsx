import React, { useState } from 'react';
import { ContactLink } from '../../../../../components/ContactLink';
import { NotificationNumber } from '../../../../../components/NotificationNumber';
import WindowContainer from '../../../../../components/WindowContainer';
import { WPFriendContact } from '../../../../../components/WPFriendContact';
import IUserContactDTO from '../../../../../dtos/IUserContactDTO';
import theme from '../../../../../global/styles/theme';
import { useAuth } from '../../../../../hooks/auth';
import { useEventOwners } from '../../../../../hooks/eventOwners';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useFriends } from '../../../../../hooks/friends';

import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  Name,
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

export function OwnerButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { user } = useAuth();
  const { selectedUserContact, handleSelectedUserContact } = useFriends();
  const {
    selectedEventOwner,
    selectedEvent,
    selectedUserEventTasks,
  } = useEventVariables();
  const {
    handleUserEventTasksWindow,
  } = useEventTasks();
  const { deleteEventOwner } = useEventOwners();
  // const { eventDebitTransactions } = useTransaction();

  const [accessContact, setAccessContact] = useState(false);

  function goToContact(data: IUserContactDTO) {
    handleSelectedUserContact(data);
    setAccessContact(!accessContact);
  }
  function closeContactWindow() {
    setAccessContact(false);
  }

  async function handleDeleteOwner() {
    await deleteEventOwner(selectedEventOwner.id);
    closeContactWindow();
  }

  return (
    <>
      {accessContact && selectedUserContact && selectedUserContact.id && (
        <WindowContainer
          closeWindow={closeContactWindow}
          zIndex={5}
          top="30%"
          left="5%"
          height="40%"
          width="90%"
        >
          <ContactLink
            type={selectedUserContact.contact_type}
            contact={selectedUserContact.contact_info}
          />
        </WindowContainer>
      )}
      <Container
        style={{
          elevation: 5,
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
      >
        {selectedEventOwner.description !== '' && (
          <Name>{selectedEventOwner.description}</Name>
        )}

        <SectionBorder />

        <MenuButtonSection horizontal >
          <MenuButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            onPress={handleUserEventTasksWindow}
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
          {selectedEvent.event_type === 'Prom' && (
            <MenuButton
              style={{
                elevation: 5,
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
              }}
            >
              <MenuText>Transações</MenuText>
              <IconContainer
                style={{
                  elevation: 5,
                  shadowColor,
                  shadowOffset,
                  shadowOpacity,
                  shadowRadius,
                }}
                color={theme.color.title}
              >
                <Icon name="dollar-sign" />
              </IconContainer>
            </MenuButton>
          )}
          {/* <MenuButton>
            <MenuText>Notas</MenuText>
            <IconContainer
              color={theme.color.info_light}
            >
              <Icon name="file-text" />
            </IconContainer>
          </MenuButton> */}
          {selectedEvent.event_type === 'Prom' && (
            <MenuButton>
              <MenuText>Contratos</MenuText>
              <IconContainer
                color={theme.color.success_light}
              >
                <Icon name="lock" />
              </IconContainer>
            </MenuButton>
          )}

          <MenuButton
            style={{
              shadowColor: theme.menuShadow.shadowColor,
              shadowOffset: theme.menuShadow.shadowOffset,
              shadowOpacity: theme.menuShadow.shadowOpacity,
              shadowRadius: theme.menuShadow.shadowRadius,
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
          </MenuButton>

          {selectedEventOwner.userEventOwner.id !== user.id
            && user.id === selectedEvent.user_id && (
              <MenuButton
                style={{
                  shadowColor: theme.menuShadow.shadowColor,
                  shadowOffset: theme.menuShadow.shadowOffset,
                  shadowOpacity: theme.menuShadow.shadowOpacity,
                  shadowRadius: theme.menuShadow.shadowRadius,
                  elevation: 5,
                }}
                onPress={handleDeleteOwner}
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
            )}

        </MenuButtonSection>

        <SectionBorder />

        {selectedEventOwner.userEventOwner.userContacts.length > 0 &&
          <ContactSection horizontal>
            {selectedEventOwner.userEventOwner.userContacts.map(contact => {
              return (
                <WPFriendContact goToContact={() => goToContact(contact)} contact={contact} key={contact.id} />
              );
            })}
          </ContactSection>
        }
        <SectionBorder />

        <FooterContainer>
          <DateText>Criado dia: </DateText>
          <DateText>
            {formatOnlyDateShort(String(selectedEventOwner.created_at))}
          </DateText>
        </FooterContainer>
      </Container>
    </>
  );
}
