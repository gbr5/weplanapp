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
  FieldContainer,
  FieldLabel,
  ConfirmGuestButton,
  Icon,
  Name,
} from './styles';
import GuestContact from '../GuestContact';

export function EventGuestButtonInfo(): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { user } = useAuth();
  const {
    selectedGuest,
    guests,
    owners,
    members,
    isOwner,
  } = useMyEvent();
  const { getFriends, handleUnselectedFriends } = useFriends();
  const {
    editGuest,
    handleSelectWePlanGuestWindow,
    handleDissociateUserFromGuestConfirmation,
    handleCreateGuestContactWindow,
  } = useEventGuests();

  const [editGuestName, setEditGuestName] = useState(false);
  const [
    editGuestDescriptionComponent,
    setEditGuestDescriptionComponent,
  ] = useState(false);

  const isMine = useMemo(() => selectedGuest.host_id === user.id, [
    selectedGuest,
    user,
  ]);
  const guestName = useMemo(
    () => `${selectedGuest.first_name}  ${selectedGuest.last_name}`,
    [selectedGuest],
  );
  const weplanGuest = useMemo(
    () =>
      selectedGuest.weplanUser &&
      !!selectedGuest.weplanGuest &&
      !!selectedGuest.weplanGuest.weplanUserGuest,
    [selectedGuest],
  );
  const weplanGuestName = useMemo(() => {
    if (weplanGuest) {
      const { personInfo } = selectedGuest.weplanGuest.weplanUserGuest;
      return personInfo
        ? `${personInfo.first_name}  ${personInfo.last_name}`
        : selectedGuest.weplanGuest.weplanUserGuest.name;
    }
    return undefined;
  }, [selectedGuest, weplanGuest]);
  const host = useMemo(() => {
    if (selectedGuest.host_id === user.id) {
      let { personInfo } = user;
      return personInfo ? `${personInfo.first_name}  ${personInfo.last_name}` : user.name;
    }
    const findOwner = owners.find(
      owner => owner.userEventOwner.id === selectedGuest.host_id,
    );
    if (findOwner) {
      let { personInfo } = findOwner.userEventOwner;
      return personInfo ? `${personInfo.first_name}  ${personInfo.last_name}` : user.name;
    }
    const findMember = members.find(
      member => member.userEventMember.id === selectedGuest.host_id,
    );
    if (findMember) {
      let { personInfo } = findMember.userEventMember;
      return personInfo ? `${personInfo.first_name}  ${personInfo.last_name}` : user.name;
    }
    return '';
  }, [user, owners, members, selectedGuest]);

  function handleEditGuestName(): void {
    isMine && setEditGuestName(!editGuestName);
  }
  function handleEditGuestDescriptionComponent(): void {
    isMine && setEditGuestDescriptionComponent(!editGuestDescriptionComponent);
  }

  async function handleEditGuestFirstName(first_name: string): Promise<void> {
    await editGuest({
      ...selectedGuest,
      first_name,
    });
  }
  async function handleEditGuestLastName(last_name: string): Promise<void> {
    await editGuest({
      ...selectedGuest,
      last_name,
    });
  }
  async function handleEditGuestDescription(
    description: string,
  ): Promise<void> {
    await editGuest({
      ...selectedGuest,
      description,
    });
  }

  async function handleWePlanGuest(): Promise<void> {
    if (isMine) {
      if (!weplanGuest) {
        console.log(isMine, weplanGuest);
        const findWePlanGuests = guests
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
        console.log(isMine, weplanGuest);
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
                defaultValue={selectedGuest.first_name}
                handleOnSubmit={handleEditGuestFirstName}
                placeholder={selectedGuest.first_name}
                closeComponent={handleEditGuestName}
              />
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Sobrenome: </FieldLabel>
              <InlineFormField
                defaultValue={selectedGuest.last_name}
                handleOnSubmit={handleEditGuestLastName}
                placeholder={selectedGuest.last_name}
                closeComponent={handleEditGuestName}
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
            defaultValue={selectedGuest.description}
            handleOnSubmit={handleEditGuestDescription}
            placeholder={selectedGuest.description}
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
          <Name>{selectedGuest.description}</Name>
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
          {selectedGuest.contacts.map(contact =>
            <GuestContact guestContact={contact}/>
          )}
        </MenuButtonSection>
      )}

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

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {formatOnlyDateShort(String(selectedGuest.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
