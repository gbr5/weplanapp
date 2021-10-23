import React, {
  useContext,
  createContext,
  useState,
} from 'react';
import { Contact } from 'react-native-contacts';

import api from '../services/api';

import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IAddNewEventGuestDTO from '../dtos/IAddNewEventGuestDTO';
import { useMyEvent } from './myEvent';
import ICreateGuestContactDTO from '../dtos/ICreateGuestContactDTO';
import IGuestContactDTO from '../dtos/IGuestContactDTO';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import IFriendDTO from '../dtos/IFriendDTO';
import { useAuth } from './auth';
import { useFriends } from './friends';
import { useEventVariables } from './eventVariables';

interface EventGuestsContextType {
  allGuestsFilter: boolean;
  confirmedGuestsFilter: boolean;
  dissociateUserFromGuestConfirmation: boolean;
  guestFilterWindow: boolean;
  deleteGuestConfirmationWindow: boolean;
  loading: boolean;
  newGuestForm: boolean;
  newGuestWindow: boolean;
  selectWePlanGuestsWindow: boolean;
  selectWePlanGuestWindow: boolean;
  notConfirmedGuestsFilter: boolean;
  onlyMyGuestsFilter: boolean;
  selectedGuestContact: IGuestContactDTO;
  createGuestContactWindow: boolean;
  // myMaxNumberOfGuests: number;
  handleCreateGuestContactWindow: () => void;
  handleDeleteGuestConfirmationWindow: () => void;
  addNewGuest: (data: IAddNewEventGuestDTO) => Promise<void>;
  associateUserToEventGuest: (data: IFriendDTO) => Promise<void>;
  createMultipleWePlanGuests: (data: IFriendDTO[]) => Promise<void>;
  createMultipleMobileGuests: (data: Contact[]) => Promise<void>;
  createGuestContact: (data: ICreateGuestContactDTO) => Promise<void>;
  deleteGuestContact: (data: IGuestContactDTO) => Promise<void>;
  deleteGuest: (data: IEventGuestDTO) => Promise<void>;
  deleteWePlanGuest: () => Promise<void>;
  editGuest: (data: IEventGuestDTO) => Promise<IEventGuestDTO>;
  handleAllGuestsFilter: () => void;
  handleConfirmedGuestsFilter: () => void;
  handleGuestFilterWindow: () => void;
  handleNewGuestForm: () => void;
  handleNewGuestWindow: () => void;
  handleNotConfirmedGuestsFilter: () => void;
  handleSelectWePlanGuestsWindow: () => void;
  handleSelectWePlanGuestWindow: () => void;
  handleOnlyMyGuestsFilter: () => void;
  selectGuestContact: (data: IGuestContactDTO) => void;
  updateGuestContact: (data: IGuestContactDTO) => Promise<void>;
  handleDissociateUserFromGuestConfirmation: () => void;
  sendMassEmailInvitations: () => Promise<void>;
  unsetEventGuestVariables: () => void;
}

const EventGuestsContext = createContext({} as EventGuestsContextType);

const EventGuestsProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { handleUnselectedFriends } = useFriends();
  const { getEventGuests } = useMyEvent();
  const {
    selectedEvent,
    selectEventGuest,
    eventGuests,
    selectedEventGuest,
    eventOwners,
    eventMembers,
  } = useEventVariables();

  const [loading, setLoading] = useState(false);
  const [guestFilterWindow, setGuestFilterWindow] = useState(false);
  const [selectedGuestContact, setSelectedGuestContact] = useState({} as IGuestContactDTO);
  const [confirmedGuestsFilter, setConfirmedGuestsFilter] = useState(false);
  const [notConfirmedGuestsFilter, setNotConfirmedGuestsFilter] = useState(false);
  const [allGuestsFilter, setAllGuestsFilter] = useState(true);
  const [onlyMyGuestsFilter, setOnlyMyGuestsFilter] = useState(false);
  const [newGuestForm, setNewGuestForm] = useState(false);
  const [newGuestWindow, setNewGuestWindow] = useState(false);
  const [selectWePlanGuestsWindow, setSelectWePlanGuestsWindow] = useState(false);
  const [selectWePlanGuestWindow, setSelectWePlanGuestWindow] = useState(false);
  const [
    dissociateUserFromGuestConfirmation,
    setDissociateUserFromGuestConfirmation,
  ] = useState(false);
  const [createGuestContactWindow, setCreateGuestContactWindow] = useState(false);
  const [deleteGuestConfirmationWindow, setDeleteGuestConfirmationWindow] = useState(false);

  function handleCreateGuestContactWindow(): void {
    setCreateGuestContactWindow(!createGuestContactWindow);
  }

  function handleDeleteGuestConfirmationWindow(): void {
    setDeleteGuestConfirmationWindow(!deleteGuestConfirmationWindow);
  }
  function handleAllGuestsFilter() {
    setAllGuestsFilter(!allGuestsFilter);
  }

  function handleSelectWePlanGuestsWindow() {
    selectWePlanGuestsWindow === true && handleUnselectedFriends([]);
    setSelectWePlanGuestsWindow(!selectWePlanGuestsWindow);
  }
  function handleSelectWePlanGuestWindow() {
    selectWePlanGuestWindow === true && handleUnselectedFriends([]);
    setSelectWePlanGuestWindow(!selectWePlanGuestWindow);
  }
  function handleNewGuestForm() {
    setNewGuestForm(!newGuestForm);
  }
  function handleNewGuestWindow() {
    setNewGuestWindow(!newGuestWindow);
  }
  function handleDissociateUserFromGuestConfirmation(): void {
    setDissociateUserFromGuestConfirmation(
      !dissociateUserFromGuestConfirmation,
    );
  }
  function handleConfirmedGuestsFilter() {
    allGuestsFilter && setAllGuestsFilter(false);
    setConfirmedGuestsFilter(!confirmedGuestsFilter);
  }
  function handleNotConfirmedGuestsFilter() {
    allGuestsFilter && setAllGuestsFilter(false);
    setNotConfirmedGuestsFilter(!notConfirmedGuestsFilter);
  }
  function handleOnlyMyGuestsFilter() {
    allGuestsFilter && setAllGuestsFilter(false);
    setOnlyMyGuestsFilter(!onlyMyGuestsFilter);
  }
  function unsetEventGuestVariables() {
    setSelectedGuestContact({} as IGuestContactDTO);
  }
  function handleGuestFilterWindow() {
    setGuestFilterWindow(!guestFilterWindow);
  }

  async function addNewGuest({ first_name, last_name }: IAddNewEventGuestDTO) {
    try {
      setLoading(true);
      const findGuest = eventGuests.find(
        guest => guest.last_name === last_name && guest.first_name === first_name,
      );
      if (findGuest)
        return Alert.alert(
          `Convidado Duplicado`,
          `Já existe um convidado com este nome - ${first_name} ${last_name}!`,
        );
      await api.post(`event-guests/${selectedEvent.id}`, {
        first_name,
        last_name: last_name ? last_name : '',
        description: ' ',
        weplanUser: false,
        confirmed: false,
        user_id: '0',
      });
      await getEventGuests(selectedEvent.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function createMultipleWePlanGuests(data: IFriendDTO[]) {
    try {
      setLoading(true);
      const users = data.map(({ friend }) => friend);
      await api.post(`/create-multiple-weplan-guests/${selectedEvent.id}`, {
        users,
      });
      await getEventGuests(selectedEvent.id);
      handleNewGuestWindow();
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function createMultipleMobileGuests(data: Contact[]) {
    try {
      setLoading(true);
      const contacts = data.map(({
        givenName,
        familyName,
        phoneNumbers,
        emailAddresses,
      }) => {
        const findGuest = eventGuests.find(
          guest => guest.last_name === familyName && guest.first_name === givenName,
        );
        if (findGuest)
          return Alert.alert(
            `Convidado Duplicado`,
            `Já existe um convidado com este nome - ${givenName} ${familyName}!`,
          );
        return {
          givenName,
          familyName,
          phoneNumbers: phoneNumbers.map(({ number }) => {
            return {
              number,
            };
          }),
          emailAddresses: emailAddresses.map(({ email }) => {
            return {
              email,
            };
          }),
        };
      })
      await api.post(`/create-multiple-mobile-guests/${selectedEvent.id}`, {
        contacts,
      });
      await getEventGuests(selectedEvent.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function editGuest(data: IEventGuestDTO) {
    try {
      setLoading(true);
      const response = await api.put(`event-guests/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        confirmed: data.confirmed,
      });
      selectEventGuest(response.data);
      await getEventGuests(data.event_id);
      return response.data;
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function deleteGuest(data: IEventGuestDTO) {
    try {
      setLoading(true);
      await api.delete(`event-guests/${data.id}`);
      await getEventGuests(selectedEvent.id);
    } catch {
      throw new Error();
    } finally {
      selectEventGuest({} as IEventGuestDTO);
      setLoading(false);
    }
  }

  async function createGuestContact(data: ICreateGuestContactDTO) {
    try {
      setLoading(true);
      await api.post('/guest-contacts', data);
      await getEventGuests(selectedEvent.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function updateGuestContact(data: IGuestContactDTO) {
    try {
      setLoading(true);
      await api.put(`/guest-contacts/${data.id}`, data);
      await getEventGuests(selectedEvent.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function deleteGuestContact(data: IGuestContactDTO) {
    try {
      setLoading(true);
      await api.delete(`/guest-contacts/${data.id}`);
      await getEventGuests(selectedEvent.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  function selectGuestContact(data: IGuestContactDTO) {
    setSelectedGuestContact(data);
  }

  async function deleteWePlanGuest(): Promise<void> {
    try {
      setLoading(true);
      await api.delete(
        `/event/weplan-guests/${selectedEventGuest.weplanGuest.id}`,
      );
      await getEventGuests(selectedEvent.id);
      setDissociateUserFromGuestConfirmation(false);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function associateUserToEventGuest(data: IFriendDTO): Promise<void> {
    try {
      setLoading(true);
      const { personInfo } = data.friend;
      if (personInfo) {
        const findGuest = eventGuests.find(
          guest =>
            guest.first_name === personInfo.first_name &&
            guest.last_name === personInfo.last_name,
        );

        if (findGuest && findGuest.weplanUser) {
          return Alert.alert(
            `Convidado duplicado!`,
            `Já existe um convidado ${personInfo.first_name} ${personInfo.last_name}.`,
          );
        }
      }

      await api.post(`/associate-user-to-event-guest/`, {
        guest_id: selectedEventGuest.id,
        user_id: data.friend_id,
      });

      return await getEventGuests(selectedEvent.id);
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  async function sendMassEmailInvitations(): Promise<void> {
    try {
      const findGuests = eventGuests
        .map(guest => {
          const email =
            (!!guest.contacts &&
              guest.contacts.length > 0 &&
              guest.contacts.find(contact => contact.contact_type === 'Email')
                ?.contact_info) ||
            '';
          let host = user;
          const findOwner = eventOwners.find(
            owner => owner.userEventOwner.id === guest.host_id,
          );
          if (findOwner) host = findOwner.userEventOwner;
          const findMember = eventMembers.find(
            member => member.userEventMember.id === guest.host_id,
          );
          if (findMember) host = findMember.userEventMember;
          return {
            id: guest.id,
            email,
            first_name: guest.first_name,
            host_name:
              (!!host.personInfo && host.personInfo.first_name) || host.name,
          };
        })
        .filter(e => e.email !== '');

      await api.post('/mass-invitation', {
        name: selectedEvent.name,
        eventTrimmedName: selectedEvent.trimmed_name,
        guests: findGuests,
      });
      Alert.alert('Convites enviados com sucesso!');
    } catch {
      Alert.alert('Ocorreu um erro, tente novamente!');
      throw new Error();
    }
  }
  useEffect(() => {
    if (!allGuestsFilter && !confirmedGuestsFilter && !notConfirmedGuestsFilter && !onlyMyGuestsFilter)
      return setAllGuestsFilter(true);
  }, [allGuestsFilter, confirmedGuestsFilter, notConfirmedGuestsFilter, onlyMyGuestsFilter]);

  return (
    <EventGuestsContext.Provider
      value={{
        addNewGuest,
        createGuestContact,
        createMultipleMobileGuests,
        deleteGuest,
        deleteGuestContact,
        editGuest,
        guestFilterWindow,
        deleteGuestConfirmationWindow,
        handleGuestFilterWindow,
        loading,
        selectGuestContact,
        selectedGuestContact,
        updateGuestContact,
        unsetEventGuestVariables,
        allGuestsFilter,
        confirmedGuestsFilter,
        handleAllGuestsFilter,
        handleConfirmedGuestsFilter,
        handleNewGuestForm,
        handleNewGuestWindow,
        handleNotConfirmedGuestsFilter,
        handleOnlyMyGuestsFilter,
        newGuestForm,
        newGuestWindow,
        notConfirmedGuestsFilter,
        onlyMyGuestsFilter,
        createMultipleWePlanGuests,
        handleSelectWePlanGuestsWindow,
        handleSelectWePlanGuestWindow,
        selectWePlanGuestsWindow,
        selectWePlanGuestWindow,
        associateUserToEventGuest,
        deleteWePlanGuest,
        dissociateUserFromGuestConfirmation,
        handleDissociateUserFromGuestConfirmation,
        sendMassEmailInvitations,
        createGuestContactWindow,
        handleCreateGuestContactWindow,
        handleDeleteGuestConfirmationWindow,
      }}
    >
      {children}
    </EventGuestsContext.Provider>
  );
};

function useEventGuests(): EventGuestsContextType {
  const context = useContext(EventGuestsContext);

  if (!context) throw new Error('useEventGuests must be used within an AuthProvider');
  return context;
}

export { EventGuestsProvider, useEventGuests };
