import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { subDays } from 'date-fns';
import DocumentPicker from 'react-native-document-picker';

import api from '../services/api';
import { useMyEvent } from './myEvent';
import { useEventSuppliers } from './eventSuppliers';

import ICreateEventSupplierTransactionAgreementDTO from '../dtos/ICreateEventSupplierTransactionAgreementDTO';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ITransactionDTO from '../dtos/ITransactionDTO';
import IUpdateEventSupplierTransactionAgreementDTO from '../dtos/IUpdateEventSupplierTransactionAgreementDTO';
import IEventTransactionDTO from '../dtos/IEventTransactionDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import { useFiles } from './files';
import { useEventVariables } from './eventVariables';
import IEventTransactionAgreementDTO from '../dtos/IEventTransactionAgreementDTO';
import IUpdateEventTransactionAgreementDTO from '../dtos/IUpdateEventTransactionAgreementDTO';
import ICreateEventTransactionAgreementDTO from '../dtos/ICreateEventTransactionAgreementDTO';
import ICreateEventOwnerTransactionAgreementWithTransactionsDTO from '../dtos/ICreateEventOwnerTransactionAgreementWithTransactionsDTO';
import ICreateEventMemberTransactionAgreementWithTransactionsDTO from '../dtos/ICreateEventMemberTransactionAgreementWithTransactionsDTO';
import ICreateEventParticipantsMonthlyPaymentAgreementsDTO from '../dtos/ICreateEventParticipantsMonthlyPaymentAgreementsDTO';

interface INewAgreementDTO {
  amount: number;
  installments: number;
}

interface IEditTransactionFileDTO {
  id: string;
  name: string;
}
interface IPaymentParticipantDTO {
  id: string;
  name: string;
}

interface ICreateEventSupplierTransactionAgreementWithTransactionsDTO extends ICreateEventSupplierTransactionAgreementDTO {
  transactions: ICreateTransactionDTO[];
}
interface TransactionContextType {
  createTransactionWindow: boolean;
  transactionFilesWindow: boolean;
  cancelEventTransactionConfirmationWindow: boolean;
  editNewTransactionValueWindow: boolean;
  editEventTransactionValueWindow: boolean;
  editNewTransactionDueDateWindow: boolean;
  editTransactionDueDateWindow: boolean;
  filteredEventTransactions: IEventTransactionDTO[];
  payee: IPaymentParticipantDTO;
  payer: IPaymentParticipantDTO;
  filterTransactionWindow: boolean;
  loading: boolean;
  newAgreementAmount: number;
  newAgreementInstallments: number;
  newEventSupplierTransactionAgreement: boolean;
  newTransactions: ICreateTransactionDTO[];
  selectedEventTransactionAgreements: IEventTransactionAgreementDTO[];
  selectedEventTransactionAgreement: IEventTransactionAgreementDTO;
  selectedNewTransaction: ICreateTransactionDTO;
  selectedTransaction: ITransactionDTO;
  selectedEventTransaction: IEventTransactionDTO;
  cancelledTransactionFilter: boolean;
  sortTransactionsByInterval: boolean;
  transactionNotesWindow: boolean;
  fromDateTransactionFilter: Date;
  toDateTransactionFilter: Date;
  filterTransactionOption: string;
  eventTransactionsWindow: boolean;
  sortEventTransactions: (data: IEventTransactionDTO[]) => IEventTransactionDTO[];
  createEventParticipantMonthlyPaymentAgreements: (data: ICreateEventParticipantsMonthlyPaymentAgreementsDTO) => Promise<void>;
  sortTransactionAgreements: (data: IEventTransactionAgreementDTO[]) => IEventTransactionAgreementDTO[];
  refreshOwnerTransactionAgreements: () => void;
  handleEventTransactionsWindow: () => void;
  refreshMemberTransactionAgreements: () => void;
  refreshSupplierTransactionAgreements: () => void;
  handleFilterTransactionOption: (data: string) => void;
  handleSelectedEventTransactionAgreements: (data: IEventTransactionAgreementDTO[]) => void;
  handleSelectedEventTransactionAgreement: (data: IEventTransactionAgreementDTO) => void;
  cancelEventTransaction: () => Promise<void>;
  importTransactionFile: (transaction_id: string) => Promise<void>;
  editTransactionFile: (data: IEditTransactionFileDTO) => Promise<void>;
  importTransactionImage: (transaction_id: string) => Promise<void>;
  handleTransactionFilesWindow: () => void;
  createSupplierTransactionAgreementWithTransactions: (data: ICreateEventSupplierTransactionAgreementWithTransactionsDTO) => Promise<void>;
  createTransactionAgreementWithTransactions: (data: ICreateEventTransactionAgreementDTO) => Promise<void>;
  deleteAllSupplierAgreements: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  createTransaction: (data: ICreateTransactionDTO) => Promise<ITransactionDTO>;
  editTransaction: (data: ITransactionDTO) => Promise<ITransactionDTO>;
  handleCreateTransactionWindow: () => void;
  handleCancelEventTransactionConfirmationWindow: () => void;
  handlePayee: (data: IPaymentParticipantDTO) => void;
  handlePayer: (data: IPaymentParticipantDTO) => void;
  handleEditNewTransactionValueWindow: () => void;
  handleEditNewTransactionDueDateWindow: () => void;
  handleEditTransactionDueDateWindow: () => void;
  handleTransactionNotesWindow: () => void;
  handleCancelledTransactionFilter: () => void;
  handleEditEventTransactionValueWindow: () => void;
  handleSortTransactionsByIntervalFilter: () => void;
  handleFromDateTransactionFilter: (data: Date) => void;
  handleFilteredEventTransactions: (data: IEventTransactionDTO[]) => void;
  handleToDateTransactionFilter: (data: Date) => void;
  handleEventTransactions: (data: ITransactionDTO[]) => IEventTransactionDTO[];
  handleFilterTransactionWindow: () => void;
  handleNewEventSupplierTransactionAgreement: () => void;
  handleNewAgreement: (data: INewAgreementDTO) => void;
  handleUpdateTransactionDueDate: (data: Date) => void;
  handleSelectedEventTransaction: (data: IEventTransactionDTO) => void;
  handleSelectedNewTransaction: (data: ICreateTransactionDTO) => void;
  selectNewTransactions: (data: ICreateTransactionDTO[]) => void;
  selectTransaction: (data: ITransactionDTO) => void;
  updateEventSupplierTransactionAgreement: (data: IUpdateEventSupplierTransactionAgreementDTO) => Promise<void>;
  updateEventTransactionAgreement: (data: IUpdateEventTransactionAgreementDTO) => Promise<void>;
}

const TransactionContext = createContext({} as TransactionContextType);

const TransactionProvider: React.FC = ({ children }) => {
  const {
    selectedEventSupplier,
    selectedEventMember,
    selectedEventOwner,
    selectedEvent,
    eventSuppliers,
    eventTransactions,
  } = useEventVariables();
  const {
    getEventSuppliers,
    getEventOwners,
    getEventMembers,
    getEventNotes,
    getEventTransactions,
  } = useMyEvent();
  const {
    selectSupplierTransactionAgreement,
    handleUpdateAgreementAndTransactions,
    updateEventSupplier,
    selectedSupplierTransactionAgreement,
  } = useEventSuppliers();
  const { handleSelectedFile, selectedFile } = useFiles();

  const [loading, setLoading] = useState(false);
  const [payee, setPayee] = useState({} as IPaymentParticipantDTO);
  const [payer, setPayer] = useState({} as IPaymentParticipantDTO);
  const [transactionNotesWindow, setTransactionNotesWindow] = useState(false);
  const [eventTransactionsWindow, setEventTransactionsWindow] = useState(false);
  const [createTransactionWindow, setCreateTransactionWindow] = useState(false);
  const [cancelEventTransactionConfirmationWindow, setCancelEventTransactionConfirmationWindow] = useState(false);
  const [editNewTransactionValueWindow, setEditNewTransactionValueWindow] = useState(false);
  const [editEventTransactionValueWindow, setEditEventTransactionValueWindow] = useState(false);
  const [editNewTransactionDueDateWindow, setEditNewTransactionDueDateWindow] = useState(false);
  const [editTransactionDueDateWindow, setEditTransactionDueDateWindow] = useState(false);
  const [filterTransactionWindow, setFilterTransactionWindow] = useState(false);
  const [newEventSupplierTransactionAgreement, setNewEventSupplierTransactionAgreement] = useState(false);
  const [newAgreementAmount, setNewAgreementAmount] = useState(0);
  const [newAgreementInstallments, setNewAgreementInstallments] = useState(1);
  const [newTransactions, setNewTransactions] = useState<ICreateTransactionDTO[]>([]);
  const [selectedNewTransaction, setSelectedNewTransaction] = useState({} as ICreateTransactionDTO);
  const [selectedEventTransaction, setSelectedEventTransaction] = useState({} as IEventTransactionDTO);
  const [selectedEventTransactionAgreements, setSelectedEventTransactionAgreements] = useState<IEventTransactionAgreementDTO[]>([]);
  const [selectedEventTransactionAgreement, setSelectedEventTransactionAgreement] = useState({} as IEventTransactionAgreementDTO);
  const [selectedTransaction, setSelectedTransaction] = useState({} as ITransactionDTO);
  const [fromDateTransactionFilter, setFromDateTransactionFilter] = useState(subDays(new Date(), 15));
  const [toDateTransactionFilter, setToDateTransactionFilter] = useState(new Date());
  const [sortTransactionsByInterval, setSortTransactionsByInterval] = useState(false);
  const [cancelledTransactionFilter, setCancelledTransactionFilter] = useState(false);
  const [transactionFilesWindow, setTransactionFilesWindow] = useState(false);
  const [filterTransactionOption, setFilterTransactionOption] = useState('all');
  const [filteredEventTransactions, setFilteredEventTransactions] = useState<IEventTransactionDTO[]>(eventTransactions);

  function handlePayee(data: IPaymentParticipantDTO) {
    setPayee(data);
  }
  function handlePayer(data: IPaymentParticipantDTO) {
    setPayer(data);
  }
  function handleTransactionFilesWindow() {
    setTransactionFilesWindow(!transactionFilesWindow);
  }
  function handleFilterTransactionOption(data: string) {
    setFilterTransactionOption(data);
  }
  function handleCancelledTransactionFilter() {
    setCancelledTransactionFilter(!cancelledTransactionFilter);
  }
  function handleTransactionNotesWindow() {
    setTransactionNotesWindow(!transactionNotesWindow);
  }
  function handleEventTransactionsWindow() {
    if (eventTransactionsWindow) {
      handleSelectedEventTransactionAgreement({} as IEventTransactionAgreementDTO);
      handleSelectedEventTransaction({} as IEventTransactionDTO);
    }
    setEventTransactionsWindow(!eventTransactionsWindow);
  }
  function handleEditEventTransactionValueWindow() {
    setEditEventTransactionValueWindow(!editEventTransactionValueWindow);
  }
  function handleSortTransactionsByIntervalFilter() {
    setSortTransactionsByInterval(!sortTransactionsByInterval);
  }
  function handleFilteredEventTransactions(data: IEventTransactionDTO[]) {
    setFilteredEventTransactions(data);
  }
  function handleFromDateTransactionFilter(data: Date) {
    setFromDateTransactionFilter(data);
  }
  function handleToDateTransactionFilter(data: Date) {
    setToDateTransactionFilter(data);
  }
  function handleSelectedEventTransaction(data: IEventTransactionDTO) {
    setSelectedEventTransaction(data);
  }
  function handleSelectedEventTransactionAgreement(data: IEventTransactionAgreementDTO) {
    setSelectedEventTransactionAgreement(data);
  }
  function handleSelectedEventTransactionAgreements(data: IEventTransactionAgreementDTO[]) {
    setSelectedEventTransactionAgreements(sortTransactionAgreements(data));
  }
  function handleEditTransactionDueDateWindow() {
    setEditTransactionDueDateWindow(!editTransactionDueDateWindow);
  }
  function handleEditNewTransactionValueWindow() {
    setEditNewTransactionValueWindow(!editNewTransactionValueWindow);
  }
  function handleEditNewTransactionDueDateWindow() {
    setEditNewTransactionDueDateWindow(!editNewTransactionDueDateWindow);
  }
  function handleFilterTransactionWindow() {
    setFilterTransactionWindow(!filterTransactionWindow);
  }
  function handleCancelEventTransactionConfirmationWindow() {
    setCancelEventTransactionConfirmationWindow(!cancelEventTransactionConfirmationWindow);
  }

  function sortTransactionAgreements(data: IEventTransactionAgreementDTO[]) {
    return data.sort((a, b) => {
      if (new Date(a.created_at) > new Date(b.created_at)) return 1;
      if (new Date(a.created_at) < new Date(b.created_at)) return -1;
      return 0;
    });
  }

  function sortEventTransactions(data: IEventTransactionDTO[]) {
    return data.sort((a, b) => {
      if (new Date(a.transaction.created_at) > new Date(b.transaction.created_at)) return 1;
      if (new Date(a.transaction.created_at) < new Date(b.transaction.created_at)) return -1;
      return 0;
    });
  }
  function refreshOwnerTransactionAgreements() {
    const agreements: IEventTransactionAgreementDTO[] = [];
    const ownerAgreements = selectedEventOwner.transactionAgreements ?? [];
    ownerAgreements && ownerAgreements.length > 0 && ownerAgreements.map(({
      amount,
      created_at,
      id,
      isCancelled,
      number_of_installments,
      owner_id,
      transactions,
      updated_at,
    }) => {
      const eventTransactions: IEventTransactionDTO[] = transactions.length > 0
        ? transactions.map(({ transaction }) => {
          return {
            agreement_id: id,
            agreement_type: 'owner',
            event_id: selectedEvent.id,
            transaction,
          };
        })
        : [];
      agreements.push({
        amount,
        created_at,
        event_id: selectedEvent.id,
        id,
        isCancelled,
        number_of_installments,
        participant_id: owner_id,
        participant_type: 'owner',
        transactions: eventTransactions,
        updated_at,
      })
    });
    agreements &&
      agreements.length > 0 &&
        handleSelectedEventTransactionAgreements(agreements);
  }

  function refreshMemberTransactionAgreements() {
    const agreements: IEventTransactionAgreementDTO[] = [];
    const memberAgreements = selectedEventMember.transactionAgreements ?? [];
    memberAgreements && memberAgreements.length > 0 && memberAgreements.map(({
      amount,
      created_at,
      id,
      isCancelled,
      number_of_installments,
      member_id,
      transactions,
      updated_at,
    }) => {
      const eventTransactions: IEventTransactionDTO[] = transactions.length > 0
        ? transactions.map(({ transaction }) => {
          return {
            agreement_id: id,
            agreement_type: 'member',
            event_id: selectedEvent.id,
            transaction,
          };
        })
        : [];
      agreements.push({
        amount,
        created_at,
        event_id: selectedEvent.id,
        id,
        isCancelled,
        number_of_installments,
        participant_id: member_id,
        participant_type: 'member',
        transactions: eventTransactions,
        updated_at,
      })
    });
    agreements &&
      agreements.length > 0 &&
        handleSelectedEventTransactionAgreements(agreements);
  }

  function refreshSupplierTransactionAgreements() {
    const agreements: IEventTransactionAgreementDTO[] = [];
    const supplierAgreements = selectedEventSupplier.transactionAgreements ?? [];
    supplierAgreements && supplierAgreements.length > 0 && supplierAgreements.map(({
      amount,
      created_at,
      id,
      isCancelled,
      number_of_installments,
      supplier_id,
      transactions,
      updated_at,
    }) => {
      const eventTransactions: IEventTransactionDTO[] = transactions.length > 0
        ? transactions.map(({ transaction }) => {
          return {
            agreement_id: id,
            agreement_type: 'supplier',
            event_id: selectedEvent.id,
            transaction,
          };
        })
        : [];
      agreements.push({
        amount,
        created_at,
        event_id: selectedEvent.id,
        id,
        isCancelled,
        number_of_installments,
        participant_id: supplier_id,
        participant_type: 'supplier',
        transactions: eventTransactions,
        updated_at,
      })
    });
    agreements &&
      agreements.length > 0 &&
        handleSelectedEventTransactionAgreements(agreements);
  }
  function handleEventTransactions(data: ITransactionDTO[]) {
    const updatedTransactions = data.map(transaction => {
      const supplierAgreements: IEventSupplierTransactionAgreementDTO[] = [];
      eventSuppliers.map(supplier => {
        const agreement = supplier.transactionAgreements.find(thisAgreement => {
          const findTransaction = !!thisAgreement.transactions.find(item => item.transaction.id === transaction.id);
          return findTransaction ? supplierAgreements.push(thisAgreement) : undefined;
        });
        return agreement;
      });
      const agreement_type = supplierAgreements.length > 0 ? 'supplier' : 'none';
      return {
        event_id: selectedEvent.id,
        transaction,
        agreement_type,
        agreement_id: agreement_type === 'supplier' ? supplierAgreements[0].id : 'none',
      };
    })
    .sort((a, b) => {
      if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date)) return 1;
      if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date)) return -1;
      return 0;
    });
    return updatedTransactions;
  }
  function handleNewEventSupplierTransactionAgreement() {
    setNewEventSupplierTransactionAgreement(!newEventSupplierTransactionAgreement);
  }
  function handleSelectedNewTransaction(data: ICreateTransactionDTO) {
    setSelectedNewTransaction(data);
  }
  function selectNewTransactions(data: ICreateTransactionDTO[]) {
    setNewTransactions(data);
  }
  function selectTransaction(data: ITransactionDTO) {
    setSelectedTransaction(data);
  }
  function handleNewAgreement({ amount, installments }: INewAgreementDTO) {
    setNewAgreementAmount(amount);
    setNewAgreementInstallments(installments);
  }
  function handleCreateTransactionWindow() {
    setCreateTransactionWindow(!createTransactionWindow);
  }
  async function createTransaction({
    amount,
    name,
    due_date,
    isPaid,
    payee_id,
    payer_id,
    category,
  }: ICreateTransactionDTO) {
    try {
      setLoading(true);
      const response = await api.post('/transactions', {
        amount,
        name,
        due_date,
        isPaid,
        payee_id,
        payer_id,
        category,
      });
      await getEventTransactions(selectedEvent.id);
      return response.data;
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function editTransaction({
    id,
    amount,
    name,
    category,
    due_date,
    isPaid,
  }: ITransactionDTO): Promise<ITransactionDTO> {
    try {
      setLoading(true);
      const response = await api.put('/transactions', {
        id,
        amount,
        name,
        category,
        due_date,
        isPaid,
      });
      if (selectedSupplierTransactionAgreement
        && selectedSupplierTransactionAgreement.id) {
          const updatedAgreement = selectedSupplierTransactionAgreement.transactions.map(transaction => {
            return transaction.id === id ? {
              ...transaction,
              transaction: {
                ...transaction.transaction,
                amount,
                name,
                category,
                due_date,
                isPaid,
              },
            } : transaction;
          });
          selectSupplierTransactionAgreement({
            ...selectedSupplierTransactionAgreement,
            transactions: updatedAgreement,
          });
        }
      if (filteredEventTransactions.length > 0) {
        const updatedFilteredTransactions: IEventTransactionDTO[] = filteredEventTransactions.map(item => {
          if (item.transaction.id === id) {
            return {
              ...item,
              transaction: response.data,
            };
          }
          return item;
        });
        handleFilteredEventTransactions(updatedFilteredTransactions)
      }
      selectedEventTransaction
        && selectedEventTransaction.transaction
        && setSelectedEventTransaction({
          ...selectedEventTransaction,
          transaction: response.data,
        });
      selectedEventTransaction
        && selectedEventTransaction.transaction
        && selectedEventTransaction.agreement_type === 'suppliers'
        && await getEventSuppliers(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
      return response.data;
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function handleUpdateTransactionDueDate(data: Date) {
    data.setHours(10);
    const oldTransaction = selectedEventTransaction;
    const response = await editTransaction({
      ...selectedEventTransaction.transaction,
      due_date: data,
    });
    await getEventTransactions(selectedEvent.id);
    oldTransaction.agreement_type === 'supplier'
      && await getEventSuppliers(selectedEventTransaction.event_id);
    setSelectedEventTransaction({
      ...oldTransaction,
      transaction: response,
    });
  }
  async function deleteTransaction(id: string) {
    try {
      setLoading(true);
      await api.delete(`/transactions/${id}`)
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function createEventParticipantMonthlyPaymentAgreements({
    amount,
    number_of_installments,
    event_id,
    monthly_payment,
    name,
    participants,
    start_date,
  }: ICreateEventParticipantsMonthlyPaymentAgreementsDTO) {
    try {
      setLoading(true);
      await api.post(`/create-event-participant-monthly-payment-agreements`, {
        amount,
        number_of_installments,
        event_id,
        monthly_payment,
        name,
        participants,
        start_date,
      });
      await getEventOwners(selectedEvent.id);
      await getEventMembers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      refreshOwnerTransactionAgreements();
      refreshMemberTransactionAgreements();
    }
  }
  async function createOwnerTransactionAgreementWithTransactions({
    amount,
    number_of_installments,
    owner_id,
    transactions,
  }: ICreateEventOwnerTransactionAgreementWithTransactionsDTO) {
    try {
      setLoading(true);
      const updatedTransactions = transactions.map(transaction => {
        const name = `${selectedEventOwner.userEventOwner.name} ${transactions.length > 1 ? `${transactions.findIndex(item => item === transaction) + 1} / ${transactions.length}` : ''}`;
        return {
          ...transaction,
          name,
        };
      });
      await api.post(`/event-owner-transaction-agreement-with-transactions`, {
        amount,
        number_of_installments,
        owner_id,
        transactions: updatedTransactions,
      });
      await getEventOwners(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      refreshOwnerTransactionAgreements();
    }
  }
  async function createMemberTransactionAgreementWithTransactions({
    amount,
    number_of_installments,
    member_id,
    transactions,
  }: ICreateEventMemberTransactionAgreementWithTransactionsDTO) {
    try {
      setLoading(true);
      const updatedTransactions = transactions.map(transaction => {
        const name = `${selectedEventMember.userEventMember.name} ${transactions.length > 1 ? `${transactions.findIndex(item => item === transaction) + 1} / ${transactions.length}` : ''}`;
        return {
          ...transaction,
          name,
        };
      });
      await api.post(`/event-member-transaction-agreement-with-transactions`, {
        amount,
        number_of_installments,
        member_id: member_id,
        transactions: updatedTransactions,
      });
      await getEventMembers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      refreshMemberTransactionAgreements();
    }
  }
  async function createSupplierTransactionAgreementWithTransactions({
    amount,
    number_of_installments,
    supplier_id,
    transactions,
  }: ICreateEventSupplierTransactionAgreementWithTransactionsDTO) {
    try {
      setLoading(true);
      const updatedTransactions = transactions.map(transaction => {
        const name = `${selectedEventSupplier.name} ${transactions.length > 1 ? `${transactions.findIndex(item => item === transaction) + 1} / ${transactions.length}` : ''}`;
        return {
          ...transaction,
          name,
        };
      });
      await api.post(`/event-supplier-transaction-agreement-with-transactions`, {
        amount,
        number_of_installments,
        supplier_id,
        transactions: updatedTransactions,
      });
      if (!selectedEventSupplier.isHired) {
        await updateEventSupplier({
          ...selectedEventSupplier,
          isHired: true
        });
      }
      await getEventSuppliers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      refreshSupplierTransactionAgreements();
    }
  }
  async function createTransactionAgreementWithTransactions(data: ICreateEventTransactionAgreementDTO) {
    const {
      amount,
      number_of_installments,
      transactions,
      participant_id,
      participant_type,
    } = data;
    if (participant_type === 'supplier') {
      return createSupplierTransactionAgreementWithTransactions({
        amount,
        number_of_installments,
        transactions,
        supplier_id: participant_id,
      });
    }
    if (participant_type === 'owner') {
      return createOwnerTransactionAgreementWithTransactions({
        amount,
        number_of_installments,
        transactions,
        owner_id: participant_id,
      });
    }
    if (participant_type === 'member') {
      return createMemberTransactionAgreementWithTransactions({
        amount,
        number_of_installments,
        transactions,
        member_id: participant_id,
      });
    }
  }
  async function updateEventOwnerTransactionAgreement({
    amount,
    number_of_installments,
    id,
    isCancelled,
    transactions,
  }: IUpdateEventSupplierTransactionAgreementDTO) {
    try {
      setLoading(true);
      const response = await api.put(`/event-owner-transaction-agreements`, {
        amount,
        id,
        number_of_installments,
        isCancelled,
        transactions,
      });
      setSelectedEventTransactionAgreement(response.data);
      await getEventOwners(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      refreshOwnerTransactionAgreements();
    }
  }
  async function updateEventMemberTransactionAgreement({
    amount,
    number_of_installments,
    id,
    isCancelled,
    transactions,
  }: IUpdateEventSupplierTransactionAgreementDTO) {
    try {
      setLoading(true);
      const response = await api.put(`/event-supplier-transaction-agreements`, {
        amount,
        id,
        number_of_installments,
        isCancelled,
        transactions,
      });
      setSelectedEventTransactionAgreement(response.data);
      await getEventMembers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      refreshMemberTransactionAgreements();
    }
  }
  async function updateEventSupplierTransactionAgreement({
    amount,
    number_of_installments,
    id,
    isCancelled,
    transactions,
  }: IUpdateEventSupplierTransactionAgreementDTO) {
    try {
      setLoading(true);
      const response = await api.put(`/event-supplier-transaction-agreements`, {
        amount,
        id,
        number_of_installments,
        isCancelled,
        transactions,
      });
      selectSupplierTransactionAgreement(response.data);
      setSelectedEventTransactionAgreement(response.data);
      await getEventSuppliers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      refreshSupplierTransactionAgreements();
    }
  }
  async function updateEventTransactionAgreement({
    agreement_type,
    amount,
    number_of_installments,
    id,
    isCancelled,
    transactions,
  }: IUpdateEventTransactionAgreementDTO) {
    if (agreement_type === 'supplier') {
      return updateEventSupplierTransactionAgreement({
        amount,
        number_of_installments,
        id,
        isCancelled,
        transactions,
      });
    }
    if (agreement_type === 'owner') {
      return updateEventOwnerTransactionAgreement({
        amount,
        number_of_installments,
        id,
        isCancelled,
        transactions,
      });
    }
    if (agreement_type === 'member') {
      return updateEventMemberTransactionAgreement({
        amount,
        number_of_installments,
        id,
        isCancelled,
        transactions,
      });
    }
  }
  async function deleteAllSupplierAgreements() {
    try {
      await api.delete(`/delete-event-supplier-transaction-agreements/${selectedEventSupplier.id}`);
      await getEventSuppliers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function cancelEventTransaction() {
    try {
      setLoading(true);
      const eventId = selectedEventTransaction.event_id;
      if (selectedEventTransaction.agreement_type === 'none') {
        await editTransaction({
          ...selectedEventTransaction.transaction,
          isCancelled: true,
        });
      }
      if (selectedEventTransaction.agreement_type === 'supplier') {
        const agreement = handleUpdateAgreementAndTransactions({
          id: selectedEventTransaction.agreement_id,
          transactions: [
            {
              ...selectedEventTransaction.transaction,
              isCancelled: true,
            },
          ],
        });

        await updateEventSupplierTransactionAgreement(agreement);
        await getEventSuppliers(eventId);
      }
      await getEventTransactions(eventId);
      setCancelEventTransactionConfirmationWindow(false);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function importTransactionImage(transaction_id: string) {
    try {
      setLoading(true);
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 0.5,
      });
      if (!response.cancelled) {
        let data = new FormData();
        data.append(
          'file',
          {
            uri: response.uri,
            type: `${response.type}/${response.uri.replace(/^[^\r\n]+\./g, '')}`,
            name: response.uri.replace(/^[^\r\n]+ImagePicker\//g, ''),
          },
        );
        await api.post(`/transaction-files/${transaction_id}`, data);
        await getEventSuppliers(selectedEvent.id);
        await getEventTransactions(selectedEvent.id);
      }
    } catch(err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function editTransactionFile({
    id,
    name,
  }: IEditTransactionFileDTO) {
    try {
      setLoading(true);
      const response = await api.put(`/transaction-files/${id}`, {
        name,
      });

      handleSelectedFile({
        ...selectedFile,
        name: response.data.name,
      });
      await getEventTransactions(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function importTransactionFile(transaction_id: string) {
    try {
      setLoading(true);
      const response = await DocumentPicker.pickSingle({
        mode: 'import',
        allowMultiSelection: false,
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      let data = new FormData();
      data.append(
        'file',
        {
          uri: response[0].uri,
          type: response[0].type,
          name: response[0].name
        },
      );
      await api.post(`/transaction-files/${transaction_id}`, data);
      await getEventSuppliers(selectedEvent.id);
      await getEventTransactions(selectedEvent.id);
    } catch(err) {
      if (DocumentPicker.isCancel(err)) {
        return;
      } else {
        throw new Error(err);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedEventTransaction && selectedEventTransaction.transaction) {
      const findTransaction = eventTransactions.find(item => item.transaction.id === selectedEventTransaction.transaction.id);
      findTransaction && setSelectedEventTransaction(findTransaction);
    }
    setFilteredEventTransactions(eventTransactions);
  }, [eventTransactions]);

  return (
    <TransactionContext.Provider
      value={{
        cancelEventTransaction,
        cancelEventTransactionConfirmationWindow,
        createTransactionAgreementWithTransactions,
        createTransactionWindow,
        createSupplierTransactionAgreementWithTransactions,
        deleteTransaction,
        deleteAllSupplierAgreements,
        editNewTransactionDueDateWindow,
        editNewTransactionValueWindow,
        editTransaction,
        editTransactionDueDateWindow,
        editEventTransactionValueWindow,
        filteredEventTransactions,
        filterTransactionWindow,
        handleCancelEventTransactionConfirmationWindow,
        handleCreateTransactionWindow,
        handleEditNewTransactionDueDateWindow,
        handleEditNewTransactionValueWindow,
        handleEditEventTransactionValueWindow,
        handleEditTransactionDueDateWindow,
        handleEventTransactions,
        handleFilteredEventTransactions,
        createTransaction,
        handleFilterTransactionWindow,
        handleNewAgreement,
        handleNewEventSupplierTransactionAgreement,
        handleSelectedEventTransaction,
        handleSelectedNewTransaction,
        handleUpdateTransactionDueDate,
        loading,
        newEventSupplierTransactionAgreement,
        newAgreementAmount,
        selectedNewTransaction,
        newTransactions,
        newAgreementInstallments,
        selectedEventTransaction,
        selectedTransaction,
        selectNewTransactions,
        selectTransaction,
        updateEventSupplierTransactionAgreement,
        cancelledTransactionFilter,
        fromDateTransactionFilter,
        handleCancelledTransactionFilter,
        handleFromDateTransactionFilter,
        handleSortTransactionsByIntervalFilter,
        handleToDateTransactionFilter,
        sortTransactionsByInterval,
        toDateTransactionFilter,
        handleFilterTransactionOption,
        filterTransactionOption,
        handleTransactionNotesWindow,
        transactionNotesWindow,
        handleTransactionFilesWindow,
        transactionFilesWindow,
        importTransactionFile,
        editTransactionFile,
        importTransactionImage,
        handlePayee,
        handlePayer,
        payee,
        payer,
        handleSelectedEventTransactionAgreements,
        selectedEventTransactionAgreements,
        handleSelectedEventTransactionAgreement,
        selectedEventTransactionAgreement,
        updateEventTransactionAgreement,
        refreshOwnerTransactionAgreements,
        refreshMemberTransactionAgreements,
        refreshSupplierTransactionAgreements,
        sortEventTransactions,
        sortTransactionAgreements,
        eventTransactionsWindow,
        handleEventTransactionsWindow,
        createEventParticipantMonthlyPaymentAgreements,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

function useTransaction(): TransactionContextType {
  const context = useContext(TransactionContext);

  if (!context) throw new Error('useTransaction must be used within an AuthProvider');
  return context;
}

export { TransactionProvider, useTransaction };
