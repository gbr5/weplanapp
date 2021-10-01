import React, { useState } from 'react';
import { ContactLink } from '../../../../../components/ContactLink';
import { NotificationNumber } from '../../../../../components/NotificationNumber';
import WindowContainer from '../../../../../components/WindowContainer';
import { WPFriendContact } from '../../../../../components/WPFriendContact';
import IUserContactDTO from '../../../../../dtos/IUserContactDTO';

import theme from '../../../../../global/styles/theme';
import { useEventMembers } from '../../../../../hooks/eventMembers';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useFriends } from '../../../../../hooks/friends';

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
  } = useEventVariables();
  const { handleSelectedUserContact } = useFriends();
  const { handleUserEventTasksWindow } = useEventTasks();
  const { deleteEventMember } = useEventMembers();

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

  return (
    <Container>
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
            {/* {selectedEventMember.userEventMember.avatar_url ? (

            ) : ( */}
            <Icon name="user" />
            {/* )} */}
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

        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
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
        <MenuButton
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
        </MenuButton>

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
        </MenuButton>

        <MenuButton
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
        </MenuButton>

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

        <MenuButton
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
        </MenuButton>

      </MenuButtonSection>

      <SectionBorder />

      {selectedEventMember.userEventMember.userContacts.length > 0 &&
        <ContactSection horizontal>
          {selectedEventMember.userEventMember.userContacts.map(contact => {
            return (
              <WPFriendContact
                goToContact={() => goToContact(contact)}
                contact={contact}
                key={contact.id}
              />
            );
          })}
        </ContactSection>
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
