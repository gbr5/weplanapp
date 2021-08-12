import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { addDays, subDays } from 'date-fns';
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

interface  IPayerTransactionResponseDTO {
  transactions: ITransactionDTO[];
  paidTransactions: ITransactionDTO[];
  notPaidTransactions: ITransactionDTO[];
  totalTransactions: number;
  totalPaid: number;
  totalNotPaid: number;
}

interface INewAgreementDTO {
  amount: number;
  installments: number;
}

interface ICreateEventSupplierTransactionAgreementWithTransactionsDTO extends ICreateEventSupplierTransactionAgreementDTO {
  transactions: ICreateTransactionDTO[];
}
interface TransactionContextType {
  createTransactionWindow: boolean;
  transactionFilesWindow: boolean;
  cancelEventTransactionConfirmationWindow: boolean;
  editTransactionName: boolean;
  editTransactionCategory: boolean;
  editNewTransactionValueWindow: boolean;
  editEventTransactionValueWindow: boolean;
  editNewTransactionDueDateWindow: boolean;
  editTransactionDueDateWindow: boolean;
  eventTotalExecutedDebit: number;
  eventTotalDebit: number;
  eventBalance: number;
  eventTotalExecutedCredit: number;
  eventTotalCredit: number;
  eventTransactions: IEventTransactionDTO[];
  eventDebitTransactions: ITransactionDTO[];
  eventCreditTransactions: ITransactionDTO[];
  eventCancelledTransactions: ITransactionDTO[];
  filteredEventTransactions: IEventTransactionDTO[];
  filterTransactionWindow: boolean;
  loading: boolean;
  newAgreementAmount: number;
  newAgreementInstallments: number;
  newEventSupplierTransactionAgreement: boolean;
  newTransactions: ICreateTransactionDTO[];
  selectedNewTransaction: ICreateTransactionDTO;
  selectedDate: Date;
  selectedDateWindow: boolean;
  selectedTransaction: ITransactionDTO;
  selectedEventTransaction: IEventTransactionDTO;
  cancelledTransactionFilter: boolean;
  sortTransactionsByInterval: boolean;
  transactionNotesWindow: boolean;
  fromDateTransactionFilter: Date;
  toDateTransactionFilter: Date;
  filterTransactionOption: string;
  handleFilterTransactionOption: (data: string) => void;
  cancelEventTransaction: () => Promise<void>;
  importTransactionFile: (transaction_id: string) => Promise<void>;
  importTransactionImage: (transaction_id: string) => Promise<void>;
  handleTransactionFilesWindow: () => void;
  createSupplierTransactionAgreementWithTransactions: (data: ICreateEventSupplierTransactionAgreementWithTransactionsDTO) => Promise<void>;
  deleteAllSupplierAgreements: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  createTransaction: (data: ICreateTransactionDTO) => Promise<ITransactionDTO>;
  editTransaction: (data: ITransactionDTO) => Promise<ITransactionDTO>;
  getAllEventTransactions: () => Promise<void>;
  getPayerTransactions: (payer_id: string) => Promise<IPayerTransactionResponseDTO>
  handleCreateTransactionWindow: () => void;
  handleCancelEventTransactionConfirmationWindow: () => void;
  handleEditTransactionName: () => void;
  handleEditTransactionCategory: () => void;
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
  handleSelectedDate: (data: Date) => void;
  handleUpdateTransactionDueDate: (data: Date) => void;
  handleSelectedDateWindow: () => void;
  handleSelectedEventTransaction: (data: IEventTransactionDTO) => void;
  handleSelectedNewTransaction: (data: ICreateTransactionDTO) => void;
  selectNewTransactions: (data: ICreateTransactionDTO[]) => void;
  selectTransaction: (data: ITransactionDTO) => void;
  updateEventSupplierTransactionAgreement: (data: IUpdateEventSupplierTransactionAgreementDTO) => Promise<void>;
}

const TransactionContext = createContext({} as TransactionContextType);

const TransactionProvider: React.FC = ({ children }) => {
  const { getEventSuppliers, selectedSupplier, selectedEvent, eventSuppliers } = useMyEvent();
  const {
    selectSupplierTransactionAgreement,
    handleUpdateAgreementAndTransactions,
    updateEventSupplier,
    selectedSupplierTransactionAgreement,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);
  const [transactionNotesWindow, setTransactionNotesWindow] = useState(false);
  const [createTransactionWindow, setCreateTransactionWindow] = useState(false);
  const [cancelEventTransactionConfirmationWindow, setCancelEventTransactionConfirmationWindow] = useState(false);
  const [editTransactionName, setEditTransactionName] = useState(false);
  const [editTransactionCategory, setEditTransactionCategory] = useState(false);
  const [editNewTransactionValueWindow, setEditNewTransactionValueWindow] = useState(false);
  const [editEventTransactionValueWindow, setEditEventTransactionValueWindow] = useState(false);
  const [editNewTransactionDueDateWindow, setEditNewTransactionDueDateWindow] = useState(false);
  const [editTransactionDueDateWindow, setEditTransactionDueDateWindow] = useState(false);
  const [eventTotalExecutedDebit, setEventTotalExecutedDebit] = useState(0);
  const [eventTotalDebit, setEventTotalDebit] = useState(0);
  const [eventTotalExecutedCredit, setEventTotalExecutedCredit] = useState(0);
  const [eventTotalCredit, setEventTotalCredit] = useState(0);
  const [eventBalance, setEventBalance] = useState(0);
  const [eventTransactions, setEventTransactions] = useState<IEventTransactionDTO[]>([]);
  const [eventDebitTransactions, setEventDebitTransactions] = useState<ITransactionDTO[]>([]);
  const [eventCreditTransactions, setEventCreditTransactions] = useState<ITransactionDTO[]>([]);
  const [eventCancelledTransactions, setEventCancelledTransactions] = useState<ITransactionDTO[]>([]);
  const [filterTransactionWindow, setFilterTransactionWindow] = useState(false);
  const [newEventSupplierTransactionAgreement, setNewEventSupplierTransactionAgreement] = useState(false);
  const [newAgreementAmount, setNewAgreementAmount] = useState(0);
  const [newAgreementInstallments, setNewAgreementInstallments] = useState(1);
  const [newTransactions, setNewTransactions] = useState<ICreateTransactionDTO[]>([]);
  const [selectedNewTransaction, setSelectedNewTransaction] = useState({} as ICreateTransactionDTO);
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 3));
  const [selectedDateWindow, setSelectedDateWindow] = useState(false);
  const [selectedEventTransaction, setSelectedEventTransaction] = useState({} as IEventTransactionDTO);
  const [selectedTransaction, setSelectedTransaction] = useState({} as ITransactionDTO);
  const [fromDateTransactionFilter, setFromDateTransactionFilter] = useState(subDays(new Date(), 15));
  const [toDateTransactionFilter, setToDateTransactionFilter] = useState(new Date());
  const [sortTransactionsByInterval, setSortTransactionsByInterval] = useState(false);
  const [cancelledTransactionFilter, setCancelledTransactionFilter] = useState(false);
  const [transactionFilesWindow, setTransactionFilesWindow] = useState(false);
  const [filterTransactionOption, setFilterTransactionOption] = useState('all');
  const [filteredEventTransactions, setFilteredEventTransactions] = useState<IEventTransactionDTO[]>(eventTransactions);

  function handleTransactionFilesWindow() {
    setTransactionFilesWindow(!transactionFilesWindow);
  }
  function handleFilterTransactionOption(data: string) {
    setFilterTransactionOption(data);
  }
  function sortTransactionsByDueDate(data: ITransactionDTO[]) {
    const sortedData = data.sort((a, b) => {
      if (new Date(a.due_date) > new Date(b.due_date)) return 1;
      if (new Date(a.due_date) < new Date(b.due_date)) return -1;
      return 0;
    });
    return sortedData;
  }
  function handleCancelledTransactionFilter() {
    setCancelledTransactionFilter(!cancelledTransactionFilter);
  }
  function handleTransactionNotesWindow() {
    setTransactionNotesWindow(!transactionNotesWindow);
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
  function handleEditTransactionName() {
    setEditTransactionName(!editTransactionName);
  }
  function handleEditTransactionCategory() {
    setEditTransactionCategory(!editTransactionCategory);
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
  const getAllEventTransactions = useCallback(async () => {
    try {
      const transactions: ITransactionDTO[] = [];
      const debitTransactions = await api.get<ITransactionDTO[]>(`/list-payer-transactions/${selectedEvent.id}`);
      const creditTransactions = await api.get<ITransactionDTO[]>(`/list-payee-transactions/${selectedEvent.id}`);
      debitTransactions.data.map(transaction => transactions.push(transaction));
      creditTransactions.data.map(transaction => transactions.push(transaction));
      const sortedDebitTransactions = sortTransactionsByDueDate(debitTransactions.data
        .filter(transaction => !transaction.isCancelled)
      );
      const sortedCreditTransactions = sortTransactionsByDueDate(creditTransactions.data
        .filter(transaction => !transaction.isCancelled)
      );
      const response = handleEventTransactions(transactions);
      setEventTransactions(response);
      setFilteredEventTransactions(response);

      setEventCreditTransactions(sortedCreditTransactions);
      setEventDebitTransactions(sortedDebitTransactions);
      setEventCancelledTransactions(sortedDebitTransactions);
      setEventTotalCredit(
        creditTransactions.data
          .map(transaction => Number(transaction.amount))
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0)
      );
      const entries = creditTransactions.data
        .filter(transaction => transaction.isPaid)
        .map(transaction => Number(transaction.amount))
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      setEventTotalExecutedCredit(entries);
      setEventTotalDebit(
        debitTransactions.data
        .map(transaction => Number(transaction.amount))
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
          }, 0)
      );
      const spent = debitTransactions.data
        .filter(transaction => transaction.isPaid)
        .map(transaction => Number(transaction.amount))
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      setEventTotalExecutedDebit(spent);
      setEventBalance(entries - spent);
      if (selectedEventTransaction && selectedEventTransaction.transaction) {
        const findTransaction = transactions.find(transaction => transaction.id === selectedEventTransaction.transaction.id);
        findTransaction && setSelectedEventTransaction({
          ...selectedEventTransaction,
          transaction: findTransaction,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedEvent]);
  useEffect(() => {
    getAllEventTransactions();
  }, [getAllEventTransactions, eventSuppliers, selectedEvent]);
  function handleNewEventSupplierTransactionAgreement() {
    setNewEventSupplierTransactionAgreement(!newEventSupplierTransactionAgreement);
  }
  function handleSelectedDate(data: Date) {
    setSelectedDate(data);
    setSelectedDateWindow(false);
  }
  function handleSelectedNewTransaction(data: ICreateTransactionDTO) {
    setSelectedNewTransaction(data);
  }
  function selectNewTransactions(data: ICreateTransactionDTO[]) {
    setNewTransactions(data);
  }
  function handleSelectedDateWindow() {
    setSelectedDateWindow(!selectedDateWindow);
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
      selectedEvent && selectedEvent.id && await getAllEventTransactions();
      selectedEvent && selectedEvent.id && await getEventSuppliers(selectedEvent.id);
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
  }: ITransactionDTO) {
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
      selectedTransaction && selectedTransaction.id && setSelectedTransaction(response.data);
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
      selectedEvent && selectedEvent.id && await getAllEventTransactions();
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
    await getAllEventTransactions();
    oldTransaction.agreement_type === 'supplier'
      && await getEventSuppliers(selectedEventTransaction.event_id);
    setSelectedEventTransaction({
      ...oldTransaction,
      transaction: response.data,
    });
  }
  async function deleteTransaction(id: string) {
    try {
      setLoading(true);
      await api.delete(`/transactions/${id}`)
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
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
        const name = `${selectedSupplier.name} ${transactions.length > 1 ? `${transactions.findIndex(item => item === transaction) + 1} / ${transactions.length}` : ''}`;
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
      if (!selectedSupplier.isHired) {
        await updateEventSupplier({
          ...selectedSupplier,
          isHired: true
        });
      }
      await getEventSuppliers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
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
      await getEventSuppliers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function deleteAllSupplierAgreements() {
    try {
      await api.delete(`/delete-event-supplier-transaction-agreements/${selectedSupplier.id}`);
      await getEventSuppliers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function getPayerTransactions(payer_id: string) {
    try {
      const response = await api.get<ITransactionDTO[]>(`/list-payer-transactions/${payer_id}`);
      const transactions = sortTransactionsByDueDate(response.data);
      const paidTransactions = transactions.filter(transaction => transaction.isPaid);
      const notPaidTransactions = transactions.filter(transaction => !transaction.isPaid);

      const totalTransactions = response.data
        .map(transaction => transaction.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const totalPaid = paidTransactions
        .map(transaction => transaction.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const totalNotPaid = notPaidTransactions
        .map(transaction => transaction.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      return {
        transactions,
        paidTransactions,
        notPaidTransactions,
        totalTransactions,
        totalPaid,
        totalNotPaid,
      };
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
      await getPayerTransactions(eventId);
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
        await getAllEventTransactions();
      }
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
          uri: response.uri,
          type: response.type,
          name: response.name
        },
      );
      await api.post(`/transaction-files/${transaction_id}`, data);
      await getEventSuppliers(selectedEvent.id);
      await getAllEventTransactions();
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

  return (
    <TransactionContext.Provider
      value={{
        cancelEventTransaction,
        cancelEventTransactionConfirmationWindow,
        createTransactionWindow,
        createSupplierTransactionAgreementWithTransactions,
        deleteTransaction,
        deleteAllSupplierAgreements,
        editNewTransactionDueDateWindow,
        editNewTransactionValueWindow,
        editTransaction,
        editTransactionDueDateWindow,
        eventCancelledTransactions,
        eventBalance,
        eventCreditTransactions,
        eventDebitTransactions,
        eventTotalCredit,
        eventTotalDebit,
        eventTotalExecutedCredit,
        editEventTransactionValueWindow,
        eventTotalExecutedDebit,
        eventTransactions,
        filteredEventTransactions,
        filterTransactionWindow,
        getAllEventTransactions,
        getPayerTransactions,
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
        handleSelectedDate,
        handleSelectedDateWindow,
        handleSelectedEventTransaction,
        handleSelectedNewTransaction,
        handleUpdateTransactionDueDate,
        loading,
        newEventSupplierTransactionAgreement,
        newAgreementAmount,
        selectedNewTransaction,
        newTransactions,
        newAgreementInstallments,
        selectedDate,
        selectedDateWindow,
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
        editTransactionName,
        handleEditTransactionName,
        editTransactionCategory,
        handleEditTransactionCategory,
        handleTransactionNotesWindow,
        transactionNotesWindow,
        handleTransactionFilesWindow,
        transactionFilesWindow,
        importTransactionFile,
        importTransactionImage,
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
