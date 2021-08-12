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

interface EventGuestsContextType {
  allGuestsFilter: boolean;
  confirmedGuestsFilter: boolean;
  guestFilterWindow: boolean;
  loading: boolean;
  newGuestForm: boolean;
  newGuestWindow: boolean;
  notConfirmedGuestsFilter: boolean;
  onlyMyGuestsFilter: boolean;
  selectedGuestContact: IGuestContactDTO;
  addNewGuest: (data: IAddNewEventGuestDTO) => Promise<void>;
  createMultipleMobileGuests: (data: Contact[]) => Promise<void>;
  createGuestContact: (data: ICreateGuestContactDTO) => Promise<void>;
  deleteGuestContact: (data: IGuestContactDTO) => Promise<void>;
  editGuest: (data: IEventGuestDTO) => Promise<IEventGuestDTO>;
  handleAllGuestsFilter: () => void;
  handleConfirmedGuestsFilter: () => void;
  handleGuestFilterWindow: () => void;
  handleNewGuestForm: () => void;
  handleNewGuestWindow: () => void;
  handleNotConfirmedGuestsFilter: () => void;
  handleOnlyMyGuestsFilter: () => void;
  selectGuestContact: (data: IGuestContactDTO) => void;
  updateGuestContact: (data: IGuestContactDTO) => Promise<void>;
  unsetEventGuestVariables: () => void;
}

const EventGuestsContext = createContext({} as EventGuestsContextType);

const EventGuestsProvider: React.FC = ({ children }) => {
  const { selectedEvent, getEventGuests, selectGuest, guests } = useMyEvent();

  const [loading, setLoading] = useState(false);
  const [guestFilterWindow, setGuestFilterWindow] = useState(false);
  const [selectedGuestContact, setSelectedGuestContact] = useState({} as IGuestContactDTO);
  const [confirmedGuestsFilter, setConfirmedGuestsFilter] = useState(false);
  const [notConfirmedGuestsFilter, setNotConfirmedGuestsFilter] = useState(false);
  const [allGuestsFilter, setAllGuestsFilter] = useState(true);
  const [onlyMyGuestsFilter, setOnlyMyGuestsFilter] = useState(false);
  const [newGuestForm, setNewGuestForm] = useState(false);
  const [newGuestWindow, setNewGuestWindow] = useState(false);

  function handleAllGuestsFilter() {
    setAllGuestsFilter(!allGuestsFilter);
  }

  function handleNewGuestForm() {
    setNewGuestForm(!newGuestForm);
  }

  function handleNewGuestWindow() {
    setNewGuestWindow(!newGuestWindow);
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
      const findGuest = guests.find(
        guest => guest.last_name === last_name && guest.first_name === first_name,
      );
      if (findGuest)
        return Alert.alert(
          `Convidado Duplicado`,
          `Já existe um convidado com este nome - ${first_name} ${last_name}!`,
        );
      await api.post(`events/${selectedEvent.id}/guests`, {
        first_name,
        last_name: last_name ? last_name : '',
        description: ' ',
        weplanUser: false,
        confirmed: false,
        user_id: '0',
      });
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
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
        const findGuest = guests.find(
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
      await api.post(`/create-multiple-guests/${selectedEvent.id}`, {
        contacts,
      });
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function editGuest(data: IEventGuestDTO) {
    try {
      setLoading(true);
      const response = await api.put(`events/${data.event_id}/guests/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        confirmed: data.confirmed,
      });
      selectGuest(response.data);
      await getEventGuests(data.event_id);
      return response.data;
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createGuestContact(data: ICreateGuestContactDTO) {
    try {
      setLoading(true);
      await api.post('/guest-contacts', data);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateGuestContact(data: IGuestContactDTO) {
    try {
      setLoading(true);
      await api.put(`/guest-contacts/${data.id}`, data);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteGuestContact(data: IGuestContactDTO) {
    try {
      setLoading(true);
      await api.delete(`/guest-contacts/${data.id}`);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  function selectGuestContact(data: IGuestContactDTO) {
    setSelectedGuestContact(data);
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
        deleteGuestContact,
        editGuest,
        guestFilterWindow,
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
