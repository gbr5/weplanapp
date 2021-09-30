import AsyncStorage from '@react-native-community/async-storage';
import { addDays } from 'date-fns';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMemo } from 'react';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IEventBudgetDTO from '../dtos/IEventBudgetDTO';
import IEventDTO from '../dtos/IEventDTO';
import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventNoteDTO from '../dtos/IEventNoteDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import IEventTaskDTO from '../dtos/IEventTaskDTO';
import ITaskFollowerDTO from '../dtos/ITaskFollowerDTO';
import IEventTransactionDTO from '../dtos/IEventTransactionDTO';
import ITransactionDTO from '../dtos/ITransactionDTO';
import IUserDTO from '../dtos/IUserDTO';
import { useAuth } from './auth';

interface EventVariablesContextType {
  eventBudget: IEventBudgetDTO; // 1
  eventGuests: IEventGuestDTO[]; // 2
  filteredGuests: IEventGuestDTO[]; // 2
  eventSuppliers: IEventSupplierDTO[]; // 3
  eventOwners: IEventOwnerDTO[]; // 7
  eventMembers: IEventMemberDTO[]; // 8
  eventTasks: IEventTaskDTO[]; // 9
  eventNotes: IEventNoteDTO[]; // 10
  eventSupplierTransactionAgreements: IEventSupplierTransactionAgreementDTO[]; // 11
  eventTransactions: IEventTransactionDTO[]; // 12
  filteredEventTransactions: IEventTransactionDTO[]; // 13
  newTransactions: ICreateTransactionDTO[]; // 14
  selectedDate: Date; // 15
  selectedDateWindow: boolean; // 16
  selectedEvent: IEventDTO; // 17
  selectedEventGuest: IEventGuestDTO; // 18
  selectedEventMember: IEventMemberDTO; // 19
  selectedEventNote: IEventNoteDTO; // 20
  selectedEventOwner: IEventOwnerDTO; // 21
  selectedEventSupplier: IEventSupplierDTO; // 22
  selectedEventTask: IEventTaskDTO; // 23
  selectedEventTaskFollower: ITaskFollowerDTO; // 23
  selectedEventTransaction: IEventTransactionDTO; // 24
  selectedEventSupplierTransactionAgreement: IEventSupplierTransactionAgreementDTO; // 25
  selectedNewTransaction: ICreateTransactionDTO; // 26
  isOwner: boolean;
  master: IUserDTO;
  currentSection: string;
  handleEventGuests: (data: IEventGuestDTO[]) => Promise<void>;
  handleEventSuppliers: (data: IEventSupplierDTO[]) => Promise<void>;
  handleEventOwners: (data: IEventOwnerDTO[]) => Promise<void>;
  handleEventMembers: (data: IEventMemberDTO[]) => Promise<void>;
  handleEventTasks: (data: IEventTaskDTO[]) => Promise<void>;
  handleEventNotes: (data: IEventNoteDTO[]) => Promise<void>;
  handleEventTransactions: (data: IEventTransactionDTO[]) => Promise<void>;
  transformEventTransactions: (
    data: ITransactionDTO[],
  ) => Promise<IEventTransactionDTO[]>;
  handleEventSupplierTransactionAgreements: (
    data: IEventSupplierTransactionAgreementDTO[],
  ) => Promise<void>;
  selectEvent: (data: IEventDTO) => Promise<void>;
  selectEventGuest: (data: IEventGuestDTO) => void;
  handleFilteredGuests: (data: IEventGuestDTO[]) => void;
  selectEventSupplier: (data: IEventSupplierDTO) => void;
  selectEventOwner: (data: IEventOwnerDTO) => void;
  selectEventMember: (data: IEventMemberDTO) => void;
  selectEventTask: (data: IEventTaskDTO) => void;
  selectEventTaskFollower: (data: ITaskFollowerDTO) => void;
  selectEventNote: (data: IEventNoteDTO) => void;
  selectEventTransaction: (data: IEventTransactionDTO) => void;
  selectEventSupplierTransactionAgreement: (
    data: IEventSupplierTransactionAgreementDTO,
  ) => void;
  handleEventBudget: (data: IEventBudgetDTO) => void;
  handleFilteredEventTransactions: (data: IEventTransactionDTO[]) => void;
  unsetVariables: () => Promise<void>;
  handleSelectedDate: (data: Date) => void;
  handleSelectedDateWindow: () => void;
  handleSelectedNewTransaction: (data: ICreateTransactionDTO) => void;
  selectNewTransactions: (data: ICreateTransactionDTO[]) => void;
  handleCurrentSection: (date: string) => void;
}

const EventVariablesContext = createContext({} as EventVariablesContextType);

const EventVariablesProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEventDTO>({} as IEventDTO);
  const [eventOwners, setEventOwners] = useState<IEventOwnerDTO[]>([]);

  const [eventMembers, setEventMembers] = useState<IEventMemberDTO[]>([]);

  const [eventBudget, setEventBudget] = useState<IEventBudgetDTO>({} as IEventBudgetDTO);
  const [eventGuests, setEventGuests] = useState<IEventGuestDTO[]>([]);
  const [eventSuppliers, setEventSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [eventTasks, setEventTasks] = useState<IEventTaskDTO[]>([]);
  const [eventNotes, setEventNotes] = useState<IEventNoteDTO[]>([]);
  const [
    eventSupplierTransactionAgreements,
    setEventSupplierTransactionAgreements,
  ] = useState<IEventSupplierTransactionAgreementDTO[]>([]);
  const [
    selectedEventSupplierTransactionAgreement,
    setSelectedEventSupplierTransactionAgreement,
  ] = useState({} as IEventSupplierTransactionAgreementDTO);
  const [eventTransactions, setEventTransactions] = useState<
  IEventTransactionDTO[]
  >([]);
  const [filteredEventTransactions, setFilteredEventTransactions] = useState<
    IEventTransactionDTO[]
  >([]);
  const [selectedEventGuest, setSelectedEventGuest] = useState(
    {} as IEventGuestDTO,
  );
  const [selectedEventSupplier, setSelectedEventSupplier] = useState(
    {} as IEventSupplierDTO,
  );
  const [selectedEventOwner, setSelectedEventOwner] = useState(
    {} as IEventOwnerDTO,
  );
  const [selectedEventMember, setSelectedEventMember] = useState(
    {} as IEventMemberDTO,
  );
  const [selectedEventTask, setSelectedEventTask] = useState(
    {} as IEventTaskDTO,
  );
  const [selectedEventNote, setSelectedEventNote] = useState(
    {} as IEventNoteDTO,
  );
  const [selectedEventTaskFollower, setSelectedEventTaskFollower] = useState(
    {} as ITaskFollowerDTO,
  );
  const [selectedEventTransaction, setSelectedEventTransaction] = useState(
    {} as IEventTransactionDTO,
  );
  const [newTransactions, setNewTransactions] = useState<
    ICreateTransactionDTO[]
  >([]);
  const [selectedNewTransaction, setSelectedNewTransaction] = useState(
    {} as ICreateTransactionDTO,
  );
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 3));
  const [selectedDateWindow, setSelectedDateWindow] = useState(false);
  const [currentSection, setCurrentSection] = useState('notes');
  const [filteredGuests, setFilteredGuests] = useState(eventGuests);

  async function unsetVariables(): Promise<void> {
    await AsyncStorage.removeItem('@WePlan-Party:selected-event');
    setEventBudget({} as IEventBudgetDTO); // 1
    setEventGuests([]); // 2
    setFilteredGuests([]); // 2
    setEventSuppliers([]); // 3
    setNewTransactions([]); // 4
    setEventOwners([]); // 5
    setEventMembers([]); // 6
    setEventTasks([]); // 7
    setEventNotes([]); // 8
    setEventSupplierTransactionAgreements([]); // 9
    setEventTransactions([]); // 10
    setFilteredEventTransactions([]); // 11
    setSelectedDate(addDays(new Date(), 3)); // 12
    setSelectedDateWindow(false); // 13
    setSelectedEvent({} as IEventDTO); // 14
    setSelectedEventGuest({} as IEventGuestDTO); // 15
    setSelectedEventSupplier({} as IEventSupplierDTO); // 16
    setSelectedEventOwner({} as IEventOwnerDTO); // 17
    setSelectedEventMember({} as IEventMemberDTO); // 18
    setSelectedEventTask({} as IEventTaskDTO); // 19
    setSelectedEventNote({} as IEventNoteDTO); // 20
    setSelectedEventTransaction({} as IEventTransactionDTO); // 21
    setSelectedEventSupplierTransactionAgreement(
      {} as IEventSupplierTransactionAgreementDTO,
    ); // 22
    setSelectedNewTransaction({} as ICreateTransactionDTO); // 23
    setCurrentSection('notes');
    setIsOwner(false);
    setIsMember(false);
  }

  function handleSelectedDate(data: Date): void {
    setSelectedDate(data);
    setSelectedDateWindow(false);
  }
  function handleSelectedNewTransaction(data: ICreateTransactionDTO): void {
    setSelectedNewTransaction(data);
  }
  function handleCurrentSection(data: string): void {
    setCurrentSection(data);
  }
  function selectNewTransactions(data: ICreateTransactionDTO[]): void {
    setNewTransactions(data);
  }
  function handleSelectedDateWindow(): void {
    setSelectedDateWindow(!selectedDateWindow);
  }
  async function selectEvent(data: IEventDTO): Promise<void> {
    await AsyncStorage.setItem('@WePlan-Party:selected-event', JSON.stringify(data));
    setSelectedEvent(data);
  }

  function selectEventGuest(data: IEventGuestDTO): void {
    setSelectedEventGuest(data);
  }

  function handleFilteredGuests(data: IEventGuestDTO[]): void {
    setFilteredGuests(data);
  }

  function selectEventSupplier(data: IEventSupplierDTO): void {
    setSelectedEventSupplier(data);
  }

  function selectEventOwner(data: IEventOwnerDTO): void {
    setSelectedEventOwner(data);
  }

  function selectEventMember(data: IEventMemberDTO): void {
    setSelectedEventMember(data);
  }

  function selectEventTask(data: IEventTaskDTO): void {
    setSelectedEventTask(data);
  }

  function selectEventTaskFollower(data: ITaskFollowerDTO): void {
    setSelectedEventTaskFollower(data);
  }
  function selectEventNote(data: IEventNoteDTO): void {
    setSelectedEventNote(data);
  }
  function selectEventTransaction(data: IEventTransactionDTO): void {
    setSelectedEventTransaction(data);
  }
  function selectEventSupplierTransactionAgreement(
    data: IEventSupplierTransactionAgreementDTO,
  ): void {
    setSelectedEventSupplierTransactionAgreement(data);
  }
  async function handleEventGuests(data: IEventGuestDTO[]): Promise<void> {
    const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

    event &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${JSON.parse(event).id}-guests`,
        JSON.stringify(data),
      );
    setEventGuests(data);
  }
  async function handleEventSuppliers(data: IEventSupplierDTO[]): Promise<void> {
    const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);
    event &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${JSON.parse(event).id}-suppliers`,
        JSON.stringify(data),
      );
    setEventSuppliers(data);
  }
  async function handleEventOwners(data: IEventOwnerDTO[]): Promise<void> {
    const event = await AsyncStorage.getItem('@WePlan-Party:selected-event');
    if (event) {
      const findOwner = data.find(owner => owner.userEventOwner.id === user.id);
      if (findOwner) {
        setIsOwner(true);
        await AsyncStorage.setItem(
          `@WePlan-Party:event-${JSON.parse(event).id}-owners`,
          JSON.stringify(data),
        );
      }
    }
    setEventOwners(data);
  }
  async function handleEventMembers(data: IEventMemberDTO[]): Promise<void> {
    const event = await AsyncStorage.getItem('@WePlan-Party:selected-event');
    if (event) {
      const findMember = data.find(
        member => member.userEventMember.id === user.id,
      );
      if (findMember || isOwner) {
        !isOwner && setIsMember(true);
        await AsyncStorage.setItem(
          `@WePlan-Party:event-${JSON.parse(event).id}-owners`,
          JSON.stringify(data),
        );
      }
    }
    setEventMembers(data);
  }
  async function handleEventTasks(data: IEventTaskDTO[]): Promise<void> {
    const event = await AsyncStorage.getItem('@WePlan-Party:selected-event');

    (isMember || isOwner) && event &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${JSON.parse(event).id}-tasks`,
        JSON.stringify(data),
      );
    setEventTasks(data);
  }
  async function handleEventNotes(data: IEventNoteDTO[]): Promise<void> {
    const event = await AsyncStorage.getItem('@WePlan-Party:selected-event');
    (isMember || isOwner) && event &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${JSON.parse(event).id}-notes`,
        JSON.stringify(data),
      );
    setEventNotes(data);
  }
  async function handleEventTransactions(data: IEventTransactionDTO[]): Promise<void> {
    const event = await AsyncStorage.getItem('@WePlan-Party:selected-event');
    (isMember || isOwner) &&
      event &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${JSON.parse(event).id}-transactions`,
        JSON.stringify(data),
      );
    setEventTransactions(data);
  }
  async function transformEventTransactions(
    data: ITransactionDTO[],
  ): Promise<IEventTransactionDTO[]> {
    const updatedTransactions = data
      .map(transaction => {
        const supplierAgreements: IEventSupplierTransactionAgreementDTO[] = [];
        eventSuppliers.map(supplier => {
          const agreement = supplier.transactionAgreements.find(
            thisAgreement => {
              const findTransaction = !!thisAgreement.transactions.find(
                item => item.transaction.id === transaction.id,
              );
              return findTransaction
                ? supplierAgreements.push(thisAgreement)
                : undefined;
            },
          );
          return agreement;
        });
        const agreement_type =
          supplierAgreements.length > 0 ? 'supplier' : 'none';
        return {
          event_id: selectedEvent.id,
          transaction,
          agreement_type,
          agreement_id:
            agreement_type === 'supplier' ? supplierAgreements[0].id : 'none',
        };
      })
      .sort((a, b) => {
        if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date))
          return 1;
        if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date))
          return -1;
        return 0;
      });
    (isMember || isOwner) &&
      selectedEvent &&
      selectedEvent.id &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${selectedEvent.id}-transactions`,
        JSON.stringify(updatedTransactions),
      );
    return updatedTransactions;
  }
  function handleFilteredEventTransactions(data: IEventTransactionDTO[]): void {
    setFilteredEventTransactions(data);
  }
  async function handleEventSupplierTransactionAgreements(
    data: IEventSupplierTransactionAgreementDTO[],
  ): Promise<void> {
    const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

    (isMember || isOwner) &&
      event &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${
          JSON.parse(event).id
        }-supplier-transaction-agreements`,
        JSON.stringify(data),
      );
    setEventSupplierTransactionAgreements(data);
  }
  async function handleEventBudget(data: IEventBudgetDTO): Promise<void> {
    (isMember || isOwner) &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${data.event_id}-budget`,
        JSON.stringify(data),
      );
    setEventBudget(data);
  }

  const master = useMemo(() => {
    const thisowner = eventOwners.filter(
      owner => owner.userEventOwner.id === selectedEvent.user_id,
    )[0];
    return thisowner ? thisowner.userEventOwner : ({} as IUserDTO);
  }, [eventOwners, selectedEvent]);

  useEffect(() => {
    () => (
      async function loadData() {
        const data = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

        if (data) return JSON.parse(data);
        return {} as IEventDTO;
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

        if (event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${JSON.parse(event).id}-owners`,
          );
          if (data) {
            const owners: IEventOwnerDTO[] = JSON.parse(data);
            const findOwner = owners.find(
              owner => owner.userEventOwner.id === user.id,
            );
            findOwner && setIsOwner(true);
            return JSON.parse(data);
          }
        }
        return [];
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

        if (isOwner && event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${JSON.parse(event).id}-members`,
          );

          if (data) {
            const members: IEventMemberDTO[] = JSON.parse(data);
            const findMember = members.find(
              member => member.userEventMember.id === user.id,
            );
            findMember && setIsMember(true);
            return setEventMembers(JSON.parse(data));
          }
        }
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);
        if ((isMember || isOwner) && event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${JSON.parse(event).id}-budget`,
          );

          if (data) {
            return setEventBudget(JSON.parse(data));
          }
        }
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);
        if ((isMember || isOwner) && event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${JSON.parse(event).id}-guests`,
          );

          if (data) {
            return JSON.parse(data);
          }
        }
        return [];
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

        if ((isMember || isOwner) && event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${JSON.parse(event).id}-suppliers`,
          );

          if (data) {
            return JSON.parse(data);
          }
        }
        return [];
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

        if ((isMember || isOwner) && event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${JSON.parse(event).id}-tasks`,
          );

          if (data) {
            return JSON.parse(data);
          }
        }
        return [];
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

        if ((isMember || isOwner) && event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${JSON.parse(event).id}-notes`,
          );

          if (data) {
            return JSON.parse(data);
          }
        }
        return [];
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

        if ((isMember || isOwner) && event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${
              JSON.parse(event).id
            }-supplier-transaction-agreements`,
          );

          if (data) {
            return JSON.parse(data);
          }
        }
        return [];
      }
    )();
  }, []);
  useEffect(() => {
    () => (
      async function loadData() {
        const event = await AsyncStorage.getItem(`@WePlan-Party:selected-event`);

        if ((isMember || isOwner) && event) {
          const data = await AsyncStorage.getItem(
            `@WePlan-Party:event-${JSON.parse(event).id}-transactions`,
          );

          if (data) {
            return JSON.parse(data);
          }
        }
        return [];
      }
    )();
  }, []);
  return (
    <EventVariablesContext.Provider
      value={{
        isOwner,
        master,
        eventBudget,
        eventGuests,
        eventMembers,
        eventNotes,
        eventOwners,
        eventSuppliers,
        eventSupplierTransactionAgreements,
        eventTasks,
        eventTransactions,
        filteredEventTransactions,
        handleEventBudget,
        handleEventGuests,
        handleEventMembers,
        handleEventNotes,
        handleEventOwners,
        handleEventSuppliers,
        handleEventTasks,
        handleEventTransactions,
        handleEventSupplierTransactionAgreements,
        handleFilteredEventTransactions,
        selectedEvent,
        selectedEventGuest,
        selectedEventMember,
        selectedEventNote,
        selectedEventOwner,
        selectedEventSupplier,
        selectedEventTask,
        selectedEventTransaction,
        selectEvent,
        selectEventGuest,
        selectEventMember,
        selectEventNote,
        selectEventOwner,
        selectEventSupplier,
        selectEventTask,
        selectEventTransaction,
        selectEventSupplierTransactionAgreement,
        selectedEventSupplierTransactionAgreement,
        unsetVariables,
        newTransactions,
        selectedDate,
        selectedDateWindow,
        selectedNewTransaction,
        handleSelectedDate,
        handleSelectedDateWindow,
        handleSelectedNewTransaction,
        selectNewTransactions,
        transformEventTransactions,
        currentSection,
        handleCurrentSection,
        filteredGuests,
        handleFilteredGuests,
        selectEventTaskFollower,
        selectedEventTaskFollower,
      }}
    >
      {children}
    </EventVariablesContext.Provider>
  );
};

function useEventVariables(): EventVariablesContextType {
  const context = useContext(EventVariablesContext);

  if (!context)
    throw new Error('useEventVariables must be used within an AuthProvider!');
  return context;
}

export { EventVariablesProvider, useEventVariables };
