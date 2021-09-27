import React, { useMemo, useState } from 'react';

import theme from '../../../../../global/styles/theme';
import { useAuth } from '../../../../../hooks/auth';
import { useEventGuests } from '../../../../../hooks/eventGuests';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useFriends } from '../../../../../hooks/friends';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import InlineFormField from '../../../../../components/InlineFormField';

import {
  Container, // 1
  DateText, // 2
  FooterContainer, // 3
  IconContainer, // 4
  MenuButtonSection, // 5
  MenuButton, // 6
  MenuText, // 7
  SectionBorder, // 8
  FieldButton,
  DeleteButton,
  FieldContainer,
  FieldLabel,
  ConfirmGuestButton,
  Icon,
  Name,
  DeleteText,
  DeleteIcon,
} from './styles';
import GuestContact from '../GuestContact';
import { useEventVariables } from '../../../../../hooks/eventVariables';

export function EventGuestButtonInfo(): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { user } = useAuth();
  const {
    selectedEventGuest,
    eventGuests,
    eventOwners,
    eventMembers,
  } = useEventVariables();
  const {
    isOwner,
  } = useMyEvent();
  const { getFriends, handleUnselectedFriends } = useFriends();
  const {
    editGuest,
    handleSelectWePlanGuestWindow,
    handleDissociateUserFromGuestConfirmation,
    handleCreateGuestContactWindow,
    handleDeleteGuestConfirmationWindow,
  } = useEventGuests();

  const [editGuestName, setEditGuestName] = useState(false);
  const [
    editGuestDescriptionComponent,
    setEditGuestDescriptionComponent,
  ] = useState(false);

  const isMine = useMemo(() => selectedEventGuest.host_id === user.id, [
    selectedEventGuest,
    user,
  ]);
  const guestName = useMemo(
    () => `${selectedEventGuest.first_name}  ${selectedEventGuest.last_name}`,
    [selectedEventGuest],
  );
  const weplanGuest = useMemo(
    () =>
      selectedEventGuest.weplanUser &&
      !!selectedEventGuest.weplanGuest &&
      !!selectedEventGuest.weplanGuest.weplanUserGuest,
    [selectedEventGuest],
  );
  const weplanGuestName = useMemo(() => {
    if (weplanGuest) {
      const { personInfo } = selectedEventGuest.weplanGuest.weplanUserGuest;
      return personInfo
        ? `${personInfo.first_name}  ${personInfo.last_name}`
        : selectedEventGuest.weplanGuest.weplanUserGuest.name;
    }
    return undefined;
  }, [selectedEventGuest, weplanGuest]);
  const host = useMemo(() => {
    if (selectedEventGuest.host_id === user.id) {
      let { personInfo } = user;
      return personInfo ? `${personInfo.first_name}  ${personInfo.last_name}` : user.name;
    }
    const findOwner = eventOwners.find(
      owner => owner.userEventOwner.id === selectedEventGuest.host_id,
    );
    if (findOwner) {
      let { personInfo } = findOwner.userEventOwner;
      return personInfo ? `${personInfo.first_name}  ${personInfo.last_name}` : user.name;
    }
    const findMember = eventMembers.find(
      member => member.userEventMember.id === selectedEventGuest.host_id,
    );
    if (findMember) {
      let { personInfo } = findMember.userEventMember;
      return personInfo ? `${personInfo.first_name}  ${personInfo.last_name}` : user.name;
    }
    return '';
  }, [user, eventOwners, eventMembers, selectedEventGuest]);

  function handleEditGuestName(): void {
    isMine && setEditGuestName(!editGuestName);
  }
  function handleEditGuestDescriptionComponent(): void {
    isMine && setEditGuestDescriptionComponent(!editGuestDescriptionComponent);
  }

  async function handleEditGuestFirstName(first_name: string): Promise<void> {
    await editGuest({
      ...selectedEventGuest,
      first_name,
    });
  }
  async function handleEditGuestLastName(last_name: string): Promise<void> {
    await editGuest({
      ...selectedEventGuest,
      last_name,
    });
  }
  async function handleEditGuestDescription(
    description: string,
  ): Promise<void> {
    await editGuest({
      ...selectedEventGuest,
      description,
    });
  }

  async function handleWePlanGuest(): Promise<void> {
    if (isMine) {
      if (!weplanGuest) {
        const findWePlanGuests = eventGuests
          .filter(
            guest =>
              guest.weplanUser &&
              guest.weplanGuest &&
              guest.weplanGuest.weplanUserGuest,
          )
          .map(guest => guest.weplanGuest.weplanUserGuest);
        findWePlanGuests.length > 0 &&
          handleUnselectedFriends(findWePlanGuests);
        await getFriends();
        handleSelectWePlanGuestWindow();
      } else {
        handleDissociateUserFromGuestConfirmation();
      }
    }
  }

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
    >
      {!isMine && (
        <>
          <FieldButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
          >
            <FieldLabel>Anfitrião: </FieldLabel>
            <Name>{host}</Name>
          </FieldButton>
          <SectionBorder />
        </>
      )}
      {weplanGuest && (
        <FieldButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
        >
          <FieldLabel>Nome e sobrenome: </FieldLabel>
          <Name>{weplanGuestName}</Name>
        </FieldButton>
      )}
      {!weplanGuest &&
        (editGuestName ? (
          <>
            <FieldContainer>
              <FieldLabel>Nome: </FieldLabel>
              <InlineFormField
                defaultValue={selectedEventGuest.first_name}
                handleOnSubmit={handleEditGuestFirstName}
                placeholder={selectedEventGuest.first_name}
                closeComponent={handleEditGuestName}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Sobrenome: </FieldLabel>
              <InlineFormField
                defaultValue={selectedEventGuest.last_name}
                handleOnSubmit={handleEditGuestLastName}
                placeholder={selectedEventGuest.last_name}
              />
            </FieldContainer>
          </>
        ) : (
          <FieldButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            onPress={handleEditGuestName}
          >
            <FieldLabel>Nome e sobrenome</FieldLabel>
            <Name>{guestName}</Name>
          </FieldButton>
        ))}
      <SectionBorder />
      {editGuestDescriptionComponent ? (
        <FieldContainer>
          <FieldLabel>Descrição: </FieldLabel>
          <InlineFormField
            defaultValue={selectedEventGuest.description}
            handleOnSubmit={handleEditGuestDescription}
            placeholder={selectedEventGuest.description}
            closeComponent={handleEditGuestDescriptionComponent}
          />
        </FieldContainer>
      ) : (
        <FieldButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleEditGuestDescriptionComponent}
        >
          <FieldLabel>Descrição</FieldLabel>
          <Name>{selectedEventGuest.description}</Name>
        </FieldButton>
      )}
      <SectionBorder />
      {isOwner && (
        <MenuButtonSection horizontal>
          <MenuButton onPress={handleCreateGuestContactWindow}>
            <MenuText>Adicionar Contato</MenuText>
            <IconContainer
              style={{
                elevation: 5,
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
              }}
              color={theme.color.primary}
            >
              <Icon name="plus" />
            </IconContainer>
          </MenuButton>
          {selectedEventGuest.contacts.map(contact =>
            <GuestContact key={contact.id} guestContact={contact}/>
          )}
        </MenuButtonSection>
      )}
      {isMine && (
        <>
          <SectionBorder />

          <FieldButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            onPress={handleWePlanGuest}
          >
            <MenuText>Usuário WePlan</MenuText>
            <ConfirmGuestButton>
              {weplanGuest ? <Icon name="check-square" /> : <Icon name="square" />}
            </ConfirmGuestButton>
          </FieldButton>

          <SectionBorder />

          <DeleteButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            onPress={handleDeleteGuestConfirmationWindow}
          >
            <DeleteText>Deletar convidado</DeleteText>
            <DeleteIcon name="trash-2" />
          </DeleteButton>
        </>
      )}

      <SectionBorder />

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {formatOnlyDateShort(String(selectedEventGuest.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
