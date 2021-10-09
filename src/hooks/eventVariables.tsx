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
import IEventTransactionAgreementDTO from '../dtos/IEventTransactionAgreementDTO';
import IEventMonthlyPaymentAgreementDTO from '../dtos/IEventMonthlyPaymentAgreementDTO';
import IParticipantDTO from '../dtos/IParticipantDTO';
import ICreateEventParticipantsMonthlyPaymentAgreementsDTO from '../dtos/ICreateEventParticipantsMonthlyPaymentAgreementsDTO';

interface IMonthlyPayments {
  eventTransactions: IEventTransactionDTO[];
  eventOwnerAgreements: IEventTransactionAgreementDTO[];
  eventMemberAgreements: IEventTransactionAgreementDTO[];
  transactionAgreements: IEventTransactionAgreementDTO[];
  total: number;
  totalPayed: number;
  totalNotPayed: number;
  totalDelayed: number;
}
interface EventVariablesContextType {
  // 1 setEventBudget
  eventBudget: IEventBudgetDTO;
  // 2 setEventGuests
  eventGuests: IEventGuestDTO[];
  // 3 setEventMonthlyPaymentAgreements
  eventMonthlyPaymentAgreements: IEventMonthlyPaymentAgreementDTO[];
  // 4 setSelectedEventMonthlyPaymentAgreement
  selectedEventMonthlyPaymentAgreement: IEventMonthlyPaymentAgreementDTO;
  // 5 setFilteredGuests
  filteredGuests: IEventGuestDTO[];
  // 6 setEventSuppliers
  eventSuppliers: IEventSupplierDTO[];
  // 7 setEventOwners
  eventOwners: IEventOwnerDTO[];
  // 8 setEventMembers
  eventMembers: IEventMemberDTO[];
  // 9 setEventTasks
  eventTasks: IEventTaskDTO[];
  // 10 setEventNotes
  eventNotes: IEventNoteDTO[];
  // 11 setEventTransactions
  eventTransactions: IEventTransactionDTO[];
  allEventTransactions: IEventTransactionDTO[];
  // 12 setFilteredEventTransactions
  filteredEventTransactions: IEventTransactionDTO[];
  // 13 setNewTransactions
  newTransactions: ICreateTransactionDTO[];
  // 14 setSelectedDate
  selectedDate: Date;
  // 15 setSelectedDateWindow
  selectedDateWindow: boolean;
  // 16 setSelectedEvent
  selectedEvent: IEventDTO;
  // 17 setSelectedEventGuest
  selectedEventGuest: IEventGuestDTO;
  // 18 setSelectedEventMember
  selectedEventMember: IEventMemberDTO;
  // 19 setSelectedEventNote
  selectedEventNote: IEventNoteDTO;
  // 20 setSelectedEventOwner
  selectedEventOwner: IEventOwnerDTO;
  // 21 setSelectedEventSupplier
  selectedEventSupplier: IEventSupplierDTO;
  // 22 setSelectedEventTask
  selectedEventTask: IEventTaskDTO;
  // 23 setSelectedEventTaskFollower
  selectedEventTaskFollower: ITaskFollowerDTO;
  // 24 setSelectedEventTransaction
  selectedEventTransaction: IEventTransactionDTO;
  // 25 setSelectedEventSupplierTransactionAgreement
  selectedEventSupplierTransactionAgreement: IEventSupplierTransactionAgreementDTO;
  // 26 setSelectedNewTransaction
  selectedNewTransaction: ICreateTransactionDTO;
  // 27 setSelectedUserEventTasks
  selectedUserEventTasks: IEventTaskDTO[];
  // 28 setIsOwner
  isOwner: boolean;
  // 29 setCurrentSection
  currentSection: string;
  // 30 setMonthlyPaymentWindow
  monthlyPaymentWindow: boolean;
  // 31 setSelectMonthlyPaymentAgreementParticipantWindow
  selectMonthlyPaymentAgreementParticipantWindow: boolean;
  // 32 setCreateMonthlyPaymentAgreementWindow
  createMonthlyPaymentAgreementWindow: boolean;
  eventMonthlyPaymentSettingsWindow: boolean;
  // 33 setSelectedParticipants
  selectedParticipants: IParticipantDTO[];
  // 34 setParticipants
  participants: IParticipantDTO[];
  // 35 setSelectedEventMonthlyPaymentAgreementParticipants
  newMonthlyPaymentAgreementVariables: ICreateEventParticipantsMonthlyPaymentAgreementsDTO;
  // 36 setNewEventMonthlyPaymentConfirmation
  newEventMonthlyPaymentConfirmation: boolean;
  // UseMemo !!
  master: IUserDTO;
  eventTransactionAgreements: IEventTransactionAgreementDTO[];
  eventSupplierTransactionAgreements: IEventTransactionAgreementDTO[];
  eventOwnerTransactionAgreements: IEventTransactionAgreementDTO[];
  eventMemberTransactionAgreements: IEventTransactionAgreementDTO[];
  monthlyPayments: IMonthlyPayments;
  totalEventRevenue: number;
  totalEventCost: number;
  handleEventGuests: (data: IEventGuestDTO[]) => void;
  handleNewMonthlyPaymentAgreementVariables: (data: ICreateEventParticipantsMonthlyPaymentAgreementsDTO) => void;
  handleNewEventMonthlyPaymentConfirmation: () => void;
  handleEventMonthlyPaymentAgreements: (data: IEventMonthlyPaymentAgreementDTO[]) => void;
  selectEventMonthlyPaymentAgreement: (data: IEventMonthlyPaymentAgreementDTO) => void;
  handleEventSuppliers: (data: IEventSupplierDTO[]) => void;
  handleEventOwners: (data: IEventOwnerDTO[]) => Promise<void>;
  handleEventMembers: (data: IEventMemberDTO[]) => Promise<void>;
  handleEventTasks: (data: IEventTaskDTO[]) => Promise<void>;
  handleSelectedUserEventTasks: (data: IEventTaskDTO[]) => void;
  handleEventNotes: (data: IEventNoteDTO[]) => Promise<void>;
  handleEventTransactions: (data: IEventTransactionDTO[]) => void;
  handleAllEventTransactions: (data: IEventTransactionDTO[]) => Promise<void>;
  transformEventTransactions: (
    data: ITransactionDTO[],
  ) => Promise<IEventTransactionDTO[]>;
  handleEventSupplierTransactionAgreements: (
    data: IEventSupplierTransactionAgreementDTO[],
  ) => Promise<void>;
  selectEvent: (data: IEventDTO) => Promise<void>;
  selectEventGuest: (data: IEventGuestDTO) => void;
  handleParticipants: (data: IParticipantDTO[]) => void;
  handleSelectedParticipants: (data: IParticipantDTO[]) => void;
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
  handleMonthlyPaymentWindow: () => void;
  handleEventMonthlyPaymentSettingsWindow: () => void;
  handleSelectMonthlyPaymentAgreementParticipantWindow: () => void;
  handleCreateMonthlyPaymentAgreementWindow: () => void;
}

const EventVariablesContext = createContext({} as EventVariablesContextType);

const EventVariablesProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [newEventMonthlyPaymentConfirmation, setNewEventMonthlyPaymentConfirmation] = useState(false);
  const [eventMonthlyPaymentSettingsWindow, setEventMonthlyPaymentSettingsWindow] = useState(false);
  const [selectMonthlyPaymentAgreementParticipantWindow, setSelectMonthlyPaymentAgreementParticipantWindow] = useState(false);
  const [createMonthlyPaymentAgreementWindow, setCreateMonthlyPaymentAgreementWindow] = useState(false);
  const [monthlyPaymentWindow, setMonthlyPaymentWindow] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEventDTO>({} as IEventDTO);
  const [eventOwners, setEventOwners] = useState<IEventOwnerDTO[]>([]);

  const [eventMembers, setEventMembers] = useState<IEventMemberDTO[]>([]);
  const [participants, setParticipants] = useState<IParticipantDTO[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<IParticipantDTO[]>([]);

  const [eventBudget, setEventBudget] = useState<IEventBudgetDTO>({} as IEventBudgetDTO);
  const [eventGuests, setEventGuests] = useState<IEventGuestDTO[]>([]);
  const [eventMonthlyPaymentAgreements, setEventMonthlyPaymentAgreements] = useState<IEventMonthlyPaymentAgreementDTO[]>([]);
  const [selectedEventMonthlyPaymentAgreement, setSelectedEventMonthlyPaymentAgreement] = useState({} as IEventMonthlyPaymentAgreementDTO);
  const [eventSuppliers, setEventSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [eventTasks, setEventTasks] = useState<IEventTaskDTO[]>([]);
  const [selectedUserEventTasks, setSelectedUserEventTasks] = useState<IEventTaskDTO[]>([]);
  const [eventNotes, setEventNotes] = useState<IEventNoteDTO[]>([]);
  const [
    selectedEventSupplierTransactionAgreement,
    setSelectedEventSupplierTransactionAgreement,
  ] = useState({} as IEventSupplierTransactionAgreementDTO);
  const [eventTransactions, setEventTransactions] = useState<
  IEventTransactionDTO[]
  >([]);
  const [allEventTransactions, setAllEventTransactions] = useState<
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
  const [newMonthlyPaymentAgreementVariables, setNewMonthlyPaymentAgreementVariables] = useState({} as ICreateEventParticipantsMonthlyPaymentAgreementsDTO);

  function handleMonthlyPaymentWindow() {
    setMonthlyPaymentWindow(!monthlyPaymentWindow);
  }

  function handleEventMonthlyPaymentSettingsWindow() {
    setEventMonthlyPaymentSettingsWindow(!eventMonthlyPaymentSettingsWindow);
  }

  function handleNewMonthlyPaymentAgreementVariables(data: ICreateEventParticipantsMonthlyPaymentAgreementsDTO) {
    setNewMonthlyPaymentAgreementVariables(data);
  }

  function handleNewEventMonthlyPaymentConfirmation() {
    setNewEventMonthlyPaymentConfirmation(!newEventMonthlyPaymentConfirmation);
  }
  function handleSelectMonthlyPaymentAgreementParticipantWindow() {
    setSelectMonthlyPaymentAgreementParticipantWindow(!selectMonthlyPaymentAgreementParticipantWindow);
  }
  function handleCreateMonthlyPaymentAgreementWindow() {
    setCreateMonthlyPaymentAgreementWindow(!createMonthlyPaymentAgreementWindow);
  }

  async function unsetVariables(): Promise<void> {
    await AsyncStorage.removeItem('@WePlan-Party:selected-event');
    // 1
    setEventBudget({} as IEventBudgetDTO);
    // 2
    setEventGuests([]);
    // 3
    setEventMonthlyPaymentAgreements([]);
    // 4
    setSelectedEventMonthlyPaymentAgreement({} as IEventMonthlyPaymentAgreementDTO);
    // 5
    setFilteredGuests([]);
    // 6
    setEventSuppliers([]);
    // 7
    setNewTransactions([]);
    // 8
    setEventOwners([]);
    // 9
    setEventMembers([]);
    // 10
    setEventTasks([]);
    // 11
    setEventNotes([]);
    // 12
    setSelectedUserEventTasks([]);
    // 13
    setEventTransactions([]);
    setAllEventTransactions([]);
    // 14
    setFilteredEventTransactions([]);
    // 15
    setSelectedDate(addDays(new Date(), 3));
    // 16
    setSelectedDateWindow(false);
    setEventMonthlyPaymentSettingsWindow(false);
    // 17
    setSelectedEvent({} as IEventDTO);
    // 18
    setSelectedEventGuest({} as IEventGuestDTO);
    // 19
    setSelectedEventSupplier({} as IEventSupplierDTO);
    // 20
    setSelectedEventOwner({} as IEventOwnerDTO);
    // 21
    setSelectedEventMember({} as IEventMemberDTO);
    // 22
    setSelectedEventTask({} as IEventTaskDTO);
    // 23
    setSelectedEventNote({} as IEventNoteDTO);
    // 24
    setSelectedEventTransaction({} as IEventTransactionDTO);
    // 25
    setSelectedEventSupplierTransactionAgreement(
      {} as IEventSupplierTransactionAgreementDTO,
    );
    // 26
    setSelectedNewTransaction({} as ICreateTransactionDTO);
    // 27
    setCurrentSection('notes');
    // 28
    setIsOwner(false);
    // 29
    setIsMember(false);
    // 30
    setMonthlyPaymentWindow(false);
    // 31
    setSelectMonthlyPaymentAgreementParticipantWindow(false);
    // 32
    setSelectedParticipants([]);
    // 33
    setParticipants([]);
    // 34
    setNewMonthlyPaymentAgreementVariables({} as ICreateEventParticipantsMonthlyPaymentAgreementsDTO);
    // 35
    setSelectedEventTaskFollower({} as ITaskFollowerDTO);
    // 36
    setNewEventMonthlyPaymentConfirmation(false);
  }

  function handleSelectedDate(data: Date): void {
    setSelectedDate(data);
    setSelectedDateWindow(false);
  }
  function handleSelectedNewTransaction(data: ICreateTransactionDTO): void {
    setSelectedNewTransaction(data);
  }
  function handleSelectedParticipants(data: IParticipantDTO[]): void {
    setSelectedParticipants(data);
  }
  function handleParticipants(data: IParticipantDTO[]): void {
    setParticipants(data);
  }
  function handleCurrentSection(data: string): void {
    setCurrentSection(data);
  }
  function handleSelectedUserEventTasks(data: IEventTaskDTO[]): void {
    setSelectedUserEventTasks(data);
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

  function selectEventMonthlyPaymentAgreement(data: IEventMonthlyPaymentAgreementDTO): void {
    setSelectedEventMonthlyPaymentAgreement(data);
  }
  function handleEventMonthlyPaymentAgreements(data: IEventMonthlyPaymentAgreementDTO[]): void {
    setEventMonthlyPaymentAgreements(data);
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
  function handleEventGuests(data: IEventGuestDTO[]): void {
    setEventGuests(data);
  }
  function handleEventSuppliers(data: IEventSupplierDTO[]): void {
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
    setEventTransactions(data);
  }
  async function handleAllEventTransactions(data: IEventTransactionDTO[]): Promise<void> {
    const event = await AsyncStorage.getItem('@WePlan-Party:selected-event');
    (isMember || isOwner) &&
      event &&
      await AsyncStorage.setItem(
        `@WePlan-Party:event-${JSON.parse(event).id}-transactions`,
        JSON.stringify(data),
      );
    setAllEventTransactions(data);
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
  const eventMemberTransactionAgreements = useMemo(() => {
    const agreements: IEventTransactionAgreementDTO[] = [];
    eventMembers.map(member => {
      member.transactionAgreements.map(agreement => {
        const transactions: IEventTransactionDTO[] = [];
        const {
          amount,
          created_at,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
        } = agreement;
        agreement.transactions.map(({ transaction }) => {
          transactions.push({
            agreement_id: agreement.id,
            agreement_type: 'member',
            event_id: member.event_id,
            transaction,
          });
          return transaction;
        });
        agreements.push({
          amount,
          created_at,
          event_id: member.event_id,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
          transactions,
          participant_id: member.id,
          participant_type: 'member',
          participant_name: member.userEventMember.name,
        });
        return agreement;
      });
      return member;
    });
    return agreements;
  }, [eventMembers]);
  const eventOwnerTransactionAgreements = useMemo(() => {
    const agreements: IEventTransactionAgreementDTO[] = [];
    eventOwners.map(owner => {
      owner.transactionAgreements.map(agreement => {
        const transactions: IEventTransactionDTO[] = [];
        const {
          amount,
          created_at,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
        } = agreement;
        agreement.transactions.map(({ transaction }) => {
          transactions.push({
            agreement_id: agreement.id,
            agreement_type: 'owner',
            event_id: owner.event_id,
            transaction,
          });
          return transaction;
        });
        agreements.push({
          amount,
          created_at,
          event_id: owner.event_id,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
          transactions,
          participant_id: owner.id,
          participant_type: 'owner',
          participant_name: owner.userEventOwner.name,
        });
        return agreement;
      });
      return owner;
    });
    return agreements;
  }, [eventOwners]);
  const eventSupplierTransactionAgreements = useMemo(() => {
    const agreements: IEventTransactionAgreementDTO[] = [];
    eventSuppliers.map(supplier => {
      supplier.transactionAgreements.map(agreement => {
        const transactions: IEventTransactionDTO[] = [];
        const {
          amount,
          created_at,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
        } = agreement;
        agreement.transactions.map(({ transaction }) => {
          transactions.push({
            agreement_id: agreement.id,
            agreement_type: 'supplier',
            event_id: supplier.event_id,
            transaction,
          });
          return transaction;
        });
        agreements.push({
          amount,
          created_at,
          event_id: supplier.event_id,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
          transactions,
          participant_id: supplier.id,
          participant_type: 'supplier',
          participant_name: supplier.name,
        });
        return agreement;
      });
      return supplier;
    });
    return agreements;
  }, [eventSuppliers]);

  const eventTransactionAgreements = useMemo(() => {
    const agreements: IEventTransactionAgreementDTO[] = [];
    eventMembers.map(member => {
      member.transactionAgreements.map(agreement => {
        const transactions: IEventTransactionDTO[] = [];
        const {
          amount,
          created_at,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
        } = agreement;
        agreement.transactions.map(({ transaction }) => {
          transactions.push({
            agreement_id: agreement.id,
            agreement_type: 'member',
            event_id: member.event_id,
            transaction,
          });
          return transaction;
        });
        agreements.push({
          amount,
          created_at,
          event_id: member.event_id,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
          transactions,
          participant_id: member.id,
          participant_type: 'member',
          participant_name: member.userEventMember.name,
        });
        return agreement;
      });
      return member;
    });
    eventOwners.map(owner => {
      owner.transactionAgreements.map(agreement => {
        const transactions: IEventTransactionDTO[] = [];
        const {
          amount,
          created_at,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
        } = agreement;
        agreement.transactions.map(({ transaction }) => {
          transactions.push({
            agreement_id: agreement.id,
            agreement_type: 'owner',
            event_id: owner.event_id,
            transaction,
          });
          return transaction;
        });
        agreements.push({
          amount,
          created_at,
          event_id: owner.event_id,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
          transactions,
          participant_id: owner.id,
          participant_type: 'owner',
          participant_name: owner.userEventOwner.name,
        });
        return agreement;
      });
      return owner;
    });
    eventSuppliers.map(supplier => {
      supplier.transactionAgreements.map(agreement => {
        const transactions: IEventTransactionDTO[] = [];
        const {
          amount,
          created_at,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
        } = agreement;
        agreement.transactions.map(({ transaction }) => {
          transactions.push({
            agreement_id: agreement.id,
            agreement_type: 'supplier',
            event_id: supplier.event_id,
            transaction,
          });
          return transaction;
        });
        agreements.push({
          amount,
          created_at,
          event_id: supplier.event_id,
          id,
          isCancelled,
          number_of_installments,
          updated_at,
          transactions,
          participant_id: supplier.id,
          participant_type: 'supplier',
          participant_name: supplier.name,
        });
        return agreement;
      });
      return supplier;
    });
    return agreements;
  }, [
    eventMembers,
    eventOwners,
    eventSuppliers,
  ]);

  const monthlyPayments = useMemo(() => {
    const eventtransactions: IEventTransactionDTO[] = [];
    const eventOwnerAgreements: IEventTransactionAgreementDTO[] = [];
    const eventMemberAgreements: IEventTransactionAgreementDTO[] = [];
    const transactionAgreements: IEventTransactionAgreementDTO[] = [];
    eventMonthlyPaymentAgreements.map(agreement => {
      agreement.eventMemberTransactionAgreements.map(item => {
        const transactions: IEventTransactionDTO[] = [];
        item.transactions.map(({ transaction }) => {
          const nTransaction = {
            agreement_id: item.id,
            agreement_type: 'member',
            event_id: selectedEvent.id,
            transaction,
          };
          transactions.push(nTransaction);
          eventtransactions.push(nTransaction);
          return transaction;
        });
        const {
          amount,
          updated_at,
          created_at,
          id,
          isCancelled,
          member_id,
          number_of_installments,
        } = item;
        const findMember = eventMembers.find(member => member.id === member_id);
        const nMAgreement = {
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
          participant_name: findMember?.userEventMember.name ?? '',
        };
        eventMemberAgreements.push(nMAgreement);
        transactionAgreements.push(nMAgreement);
        return item;
      });
      agreement.eventOwnerTransactionAgreements.map(item => {
        const transactions: IEventTransactionDTO[] = [];
        item.transactions.map(({ transaction }) => {
          const nTransaction = {
            agreement_id: item.id,
            agreement_type: 'owner',
            event_id: selectedEvent.id,
            transaction,
          };
          transactions.push(nTransaction);
          eventtransactions.push(nTransaction);
          return transaction;
        });
        const {
          amount,
          updated_at,
          created_at,
          id,
          isCancelled,
          owner_id,
          number_of_installments,
        } = item;
        const findOwner = eventOwners.find(owner => owner.id === owner_id);
        const nOAgreement = {
          amount,
          created_at,
          event_id: selectedEvent.id,
          id,
          isCancelled,
          number_of_installments,
          participant_id: owner_id,
          participant_type: 'owner',
          transactions,
          updated_at,
          participant_name: findOwner?.userEventOwner.name ?? '',
        };
        eventOwnerAgreements.push(nOAgreement);
        transactionAgreements.push(nOAgreement);
        return item;
      });
      return agreement;
    });
    const total = eventtransactions
      .filter(item => !item.transaction.isCancelled)
      .map(item => Number(item.transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    const totalPayed = eventtransactions
      .filter(item =>
        !item.transaction.isCancelled &&
        item.transaction.isPaid
      )
      .map(item => Number(item.transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    const totalNotPayed = eventtransactions
      .filter(item =>
        !item.transaction.isCancelled &&
        !item.transaction.isPaid
      )
      .map(item => Number(item.transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    const totalDelayed = eventtransactions
      .filter(item =>
        !item.transaction.isCancelled &&
        !item.transaction.isPaid &&
        new Date() > item.transaction.due_date
      )
      .map(item => Number(item.transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    return {
      eventTransactions: eventtransactions,
      eventOwnerAgreements,
      eventMemberAgreements,
      transactionAgreements,
      total,
      totalPayed,
      totalNotPayed,
      totalDelayed,
    };
  }, [eventTransactions]);

  const { totalEventCost, totalEventRevenue } = useMemo(() => {
    const totalCost =  allEventTransactions
      .filter(({ transaction }) => !transaction.isCancelled && transaction.payer_id === selectedEvent.id)
      .map(({ transaction }) => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);

    const totalRevenue =  allEventTransactions
      .filter(({ transaction }) => !transaction.isCancelled && transaction.payee_id === selectedEvent.id)
      .map(({ transaction }) => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);

      return {
        totalEventCost: totalCost,
        totalEventRevenue: totalRevenue,
      }
  }, [allEventTransactions]);

  return (
    <EventVariablesContext.Provider
      value={{
        monthlyPayments,
        eventMemberTransactionAgreements,
        eventOwnerTransactionAgreements,
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
        handleSelectedUserEventTasks,
        selectedUserEventTasks,
        eventMonthlyPaymentAgreements,
        handleEventMonthlyPaymentAgreements,
        selectEventMonthlyPaymentAgreement,
        selectedEventMonthlyPaymentAgreement,
        handleSelectMonthlyPaymentAgreementParticipantWindow,
        handleCreateMonthlyPaymentAgreementWindow,
        handleMonthlyPaymentWindow,
        monthlyPaymentWindow,
        selectMonthlyPaymentAgreementParticipantWindow,
        createMonthlyPaymentAgreementWindow,
        handleParticipants,
        handleSelectedParticipants,
        participants,
        selectedParticipants,
        handleNewMonthlyPaymentAgreementVariables,
        newMonthlyPaymentAgreementVariables,
        eventTransactionAgreements,
        handleNewEventMonthlyPaymentConfirmation,
        newEventMonthlyPaymentConfirmation,
        allEventTransactions,
        handleAllEventTransactions,
        eventMonthlyPaymentSettingsWindow,
        handleEventMonthlyPaymentSettingsWindow,
        totalEventCost,
        totalEventRevenue,
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
