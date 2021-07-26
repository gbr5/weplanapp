import React, {
  useContext,
  createContext,
  useState,
  useCallback,
} from 'react';

import api from '../services/api';

import ITransactionDTO from '../dtos/ITransactionDTO';
import { useMyEvent } from './myEvent';
import { useEventSuppliers } from './eventSuppliers';
import ICreateEventSupplierTransactionAgreementDTO from '../dtos/ICreateEventSupplierTransactionAgreementDTO';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import { addDays } from 'date-fns';
import { useEffect } from 'react';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import { Alert } from 'react-native';

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

interface IUpdateAgreementDTO extends ICreateEventSupplierTransactionAgreementDTO {
  id: string;
  isCancelled: boolean;
  transactions?: ITransactionDTO[];
}

interface ICreateEventSupplierTransactionAgreementWithTransactionsDTO extends ICreateEventSupplierTransactionAgreementDTO {
  transactions: ICreateTransactionDTO[];
}
interface TransactionContextType {
  loading: boolean;
  selectedDate: Date;
  selectedDateWindow: boolean;
  editTransactionValueWindow: boolean;
  createTransactionWindow: boolean;
  selectedTransaction: ITransactionDTO;
  eventDebitTransactions: ITransactionDTO[];
  eventCreditTransactions: ITransactionDTO[];
  eventTotalExecutedDebit: number;
  eventTotalDebit: number;
  eventBalance: number;
  eventTotalExecutedCredit: number;
  eventTotalCredit: number;
  newAgreementAmount: number;
  newAgreementInstallments: number;
  newEventSupplierTransactionAgreement: boolean;
  newTransactions: ICreateTransactionDTO[];
  updateEventSupplierTransactionAgreement: (data: IUpdateAgreementDTO) => Promise<void>;
  deleteAllSupplierAgreements: () => Promise<void>;
  handleNewEventSupplierTransactionAgreement: () => void;
  handleSelectedDateWindow: () => void;
  handleEditTransactionValueWindow: () => void;
  handleSelectedDate: (data: Date) => void;
  handleNewAgreement: (data: INewAgreementDTO) => void;
  createSupplierTransactionAgreement: (data: ICreateEventSupplierTransactionAgreementDTO) => Promise<void>;
  createSupplierTransactionAgreementWithTransactions: (data: ICreateEventSupplierTransactionAgreementWithTransactionsDTO) => Promise<void>;
  editTransaction: (data: ITransactionDTO) => Promise<void>;
  handleCreateTransactionWindow: () => void;
  selectTransaction: (data: ITransactionDTO) => void;
  deleteTransaction: (id: string) => Promise<void>;
  getPayerTransactions: (payer_id: string) => Promise<IPayerTransactionResponseDTO>
  selectNewTransactions: (data: ICreateTransactionDTO[]) => void;
  getAllEventTransactions: () => Promise<void>;
}

const TransactionContext = createContext({} as TransactionContextType);

const TransactionProvider: React.FC = ({ children }) => {
  const { getEventSuppliers, selectedSupplier, selectedEvent, eventSuppliers } = useMyEvent();
  const {
    selectSupplierTransactionAgreement,
    handleCreateSupplierTransactionAgreementWindow,
    handleCreateSupplierTransactionsWindow,
    updateEventSupplier,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);
  const [createTransactionWindow, setCreateTransactionWindow] = useState(false);
  const [editTransactionValueWindow, setEditTransactionValueWindow] = useState(false);
  const [newEventSupplierTransactionAgreement, setNewEventSupplierTransactionAgreement] = useState(false);
  const [newAgreementAmount, setNewAgreementAmount] = useState(0);
  const [newAgreementInstallments, setNewAgreementInstallments] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState({} as ITransactionDTO);
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 3));
  const [selectedDateWindow, setSelectedDateWindow] = useState(false);
  const [newTransactions, setNewTransactions] = useState<ICreateTransactionDTO[]>([]);
  const [eventDebitTransactions, setEventDebitTransactions] = useState<ITransactionDTO[]>([]);
  const [eventTotalExecutedDebit, setEventTotalExecutedDebit] = useState(0);
  const [eventTotalDebit, setEventTotalDebit] = useState(0);
  const [eventCreditTransactions, setEventCreditTransactions] = useState<ITransactionDTO[]>([]);
  const [eventTotalExecutedCredit, setEventTotalExecutedCredit] = useState(0);
  const [eventTotalCredit, setEventTotalCredit] = useState(0);
  const [eventBalance, setEventBalance] = useState(0);

  function sortTransactionsByDueDate(data: ITransactionDTO[]) {
    const sortedData = data.sort((a, b) => {
      if (new Date(a.due_date) > new Date(b.due_date)) return 1;
      if (new Date(a.due_date) < new Date(b.due_date)) return -1;
      return 0;
    });
    return sortedData;
  }

  function handleEditTransactionValueWindow() {
    setEditTransactionValueWindow(!editTransactionValueWindow)
  }

  const getAllEventTransactions = useCallback(async () => {
    try {
      const debitTransactions = await api.get<ITransactionDTO[]>(`/list-payer-transactions/${selectedEvent.id}`);
      const creditTransactions = await api.get<ITransactionDTO[]>(`/list-payee-transactions/${selectedEvent.id}`);
      const sortedDebitTransactions = sortTransactionsByDueDate(debitTransactions.data);
      const sortedCreditTransactions = sortTransactionsByDueDate(creditTransactions.data);
      setEventCreditTransactions(sortedCreditTransactions);
      setEventDebitTransactions(sortedDebitTransactions);
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

  async function editTransaction({
    id,
    amount,
    due_date,
    isPaid,
  }: ITransactionDTO) {
    try {
      setLoading(true);
      await api.put('/transactions', {
        id,
        amount,
        due_date,
        isPaid,
      });
      setSelectedTransaction({} as ITransactionDTO);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
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
      await api.post(`/event-supplier-transaction-agreement-with-transactions`, {
        amount,
        number_of_installments,
        supplier_id,
        transactions,
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

  async function createSupplierTransactionAgreement({
    amount,
    number_of_installments,
    supplier_id,
  }: ICreateEventSupplierTransactionAgreementDTO) {
    try {
      setLoading(true);
      const response = await api.post(`/event-supplier-transaction-agreements`, {
        amount,
        number_of_installments,
        supplier_id,
      });
      selectSupplierTransactionAgreement(response.data);
      await getEventSuppliers(selectedSupplier.id);
      handleCreateSupplierTransactionAgreementWindow();
      handleCreateSupplierTransactionsWindow();
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
  }: IUpdateAgreementDTO) {
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
      await getEventSuppliers(selectedSupplier.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAllSupplierAgreements() {
    try {
      setLoading(true);
      Alert.alert(`id: ${selectedSupplier.id}, name: ${selectedSupplier.name}`);
      await api.delete(`/delete-event-supplier-transaction-agreements/${selectedSupplier.id}`);
      await getEventSuppliers(selectedSupplier.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
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

  return (
    <TransactionContext.Provider
      value={{
        loading,
        selectedTransaction,
        handleNewAgreement,
        newAgreementAmount,
        newAgreementInstallments,
        editTransaction,
        createTransactionWindow,
        handleCreateTransactionWindow,
        deleteTransaction,
        selectTransaction,
        createSupplierTransactionAgreement,
        createSupplierTransactionAgreementWithTransactions,
        handleNewEventSupplierTransactionAgreement,
        newEventSupplierTransactionAgreement,
        getPayerTransactions,
        handleSelectedDate,
        selectedDate,
        selectedDateWindow,
        handleSelectedDateWindow,
        selectNewTransactions,
        newTransactions,
        eventBalance,
        eventCreditTransactions,
        eventDebitTransactions,
        eventTotalCredit,
        eventTotalDebit,
        eventTotalExecutedCredit,
        eventTotalExecutedDebit,
        getAllEventTransactions,
        handleEditTransactionValueWindow,
        editTransactionValueWindow,
        deleteAllSupplierAgreements,
        updateEventSupplierTransactionAgreement,
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
