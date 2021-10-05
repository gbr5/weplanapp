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

interface EventVariablesContextType {
  eventBudget: IEventBudgetDTO; // 1
  eventGuests: IEventGuestDTO[]; // 2
  filteredGuests: IEventGuestDTO[]; // 3
  eventSuppliers: IEventSupplierDTO[]; // 4
  eventOwners: IEventOwnerDTO[]; // 5
  eventMembers: IEventMemberDTO[]; // 6
  eventTasks: IEventTaskDTO[]; // 7
  eventNotes: IEventNoteDTO[]; // 8
  eventSupplierTransactionAgreements: IEventTransactionAgreementDTO[]; // 9
  eventOwnerTransactionAgreements: IEventTransactionAgreementDTO[]; // 9
  eventMemberTransactionAgreements: IEventTransactionAgreementDTO[]; // 9
  eventTransactions: IEventTransactionDTO[]; // 10
  eventTransactionAgreements: IEventTransactionAgreementDTO[]; // 10
  filteredEventTransactions: IEventTransactionDTO[]; // 11
  newTransactions: ICreateTransactionDTO[]; // 12
  selectedDate: Date; // 13
  selectedDateWindow: boolean; // 14
  selectedEvent: IEventDTO; // 15
  selectedEventGuest: IEventGuestDTO; // 16
  selectedEventMember: IEventMemberDTO; // 17
  selectedEventNote: IEventNoteDTO; // 18
  selectedEventOwner: IEventOwnerDTO; // 19
  selectedEventSupplier: IEventSupplierDTO; // 20
  selectedEventTask: IEventTaskDTO; // 21
  selectedEventTaskFollower: ITaskFollowerDTO; // 22
  selectedEventTransaction: IEventTransactionDTO; // 23
  selectedEventSupplierTransactionAgreement: IEventSupplierTransactionAgreementDTO; // 24
  selectedNewTransaction: ICreateTransactionDTO; // 25
  selectedUserEventTasks: IEventTaskDTO[]; // 26
  isOwner: boolean; // 27
  master: IUserDTO; // 28
  currentSection: string; //29
  handleEventGuests: (data: IEventGuestDTO[]) => void;
  handleEventSuppliers: (data: IEventSupplierDTO[]) => void;
  handleEventOwners: (data: IEventOwnerDTO[]) => Promise<void>;
  handleEventMembers: (data: IEventMemberDTO[]) => Promise<void>;
  handleEventTasks: (data: IEventTaskDTO[]) => Promise<void>;
  handleSelectedUserEventTasks: (data: IEventTaskDTO[]) => void;
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
  const [selectedUserEventTasks, setSelectedUserEventTasks] = useState<IEventTaskDTO[]>([]);
  const [eventNotes, setEventNotes] = useState<IEventNoteDTO[]>([]);
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
    // 1
    setEventBudget({} as IEventBudgetDTO);
    // 2
    setEventGuests([]);
    // 3
    setFilteredGuests([]);
    // 4
    setEventSuppliers([]);
    // 5
    setNewTransactions([]);
    // 6
    setEventOwners([]);
    // 7
    setEventMembers([]);
    // 8
    setEventTasks([]);
    // 9
    setEventNotes([]);
    // 11
    setSelectedUserEventTasks([]);
    // 12
    setEventTransactions([]);
    // 13
    setFilteredEventTransactions([]);
    // 14
    setSelectedDate(addDays(new Date(), 3));
    // 15
    setSelectedDateWindow(false);
    // 16
    setSelectedEvent({} as IEventDTO);
    // 17
    setSelectedEventGuest({} as IEventGuestDTO);
    // 18
    setSelectedEventSupplier({} as IEventSupplierDTO);
    // 19
    setSelectedEventOwner({} as IEventOwnerDTO);
    // 20
    setSelectedEventMember({} as IEventMemberDTO);
    // 21
    setSelectedEventTask({} as IEventTaskDTO);
    // 22
    setSelectedEventNote({} as IEventNoteDTO);
    // 23
    setSelectedEventTransaction({} as IEventTransactionDTO);
    // 24
    setSelectedEventSupplierTransactionAgreement(
      {} as IEventSupplierTransactionAgreementDTO,
    );
    // 25
    setSelectedNewTransaction({} as ICreateTransactionDTO);
    // 26
    setCurrentSection('notes');
    // 27
    setIsOwner(false);
    // 28
    setIsMember(false);
    // 29

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

  return (
    <EventVariablesContext.Provider
      value={{
        eventMemberTransactionAgreements,
        eventOwnerTransactionAgreements,
        eventTransactionAgreements,
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
