import React, {
  useContext,
  createContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

import api from '../services/api';

import { useMyEvent } from './myEvent';

import ICreateEventSupplierDTO from '../dtos/ICreateEventSupplierDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import IEventSupplierTransactionDTO from '../dtos/IEventSupplierTransactionDTO';
import ISupplierSubCategoryDTO from '../dtos/ISupplierSubCategoryDTO';
import ITransactionDTO from '../dtos/ITransactionDTO';
import IUpdateEventSupplierTransactionAgreementDTO from '../dtos/IUpdateEventSupplierTransactionAgreementDTO';

interface IUpdateAgreementAndTransactionsDTO {
  id: string;
  transactions: ITransactionDTO[];
}

interface EventSuppliersContextType {
  addSupplierWindow: boolean;
  createSupplierTransactionAgreementWindow: boolean;
  createSupplierTransactionsWindow: boolean;
  cancelAgreementsWindow: boolean;
  dischargeOption: string;
  dischargingWindow: boolean;
  editTransactionValueWindow: boolean;
  eventSupplierAgreementTransactionsWindow: boolean;
  loading: boolean;
  selectedSupplierCategory: string;
  selectedSupplierSubCategory: ISupplierSubCategoryDTO;
  selectedSupplierTransactionAgreement: IEventSupplierTransactionAgreementDTO;
  selectedSupplierTransaction: IEventSupplierTransactionDTO;
  supplierAgreementTransactions: IEventSupplierTransactionDTO[] | undefined;
  supplierCategoryWindow: boolean;
  supplierSubCategoryWindow: boolean;
  supplierSubCategories: ISupplierSubCategoryDTO[];
  supplierTransactionsWindow: boolean;
  supplierTransactions: ITransactionDTO[] | undefined;
  createEventSuppliers: (data: ICreateEventSupplierDTO) => Promise<void>;
  getEventSupplierTransactionAgreements: (supplier_id: string) => Promise<IEventSupplierTransactionAgreementDTO[]>;
  getEventSupplierTransactions: (agreement_id: string) => Promise<IEventSupplierTransactionDTO[]>;
  handleDichargeOption: (data: string) => void;
  handleAddSupplierWindow: () => void;
  handleDischargingWindow: () => void;
  handleSupplierCategoryWindow: () => void;
  handleSupplierSubCategoryWindow: () => void;
  handleSupplierTransactionsWindow: () => void;
  handleCreateSupplierTransactionAgreementWindow: () => void;
  handleCreateSupplierTransactionsWindow: () => void;
  handleCancelAllAgreementsWindow: () => void;
  handleCancelFutureTransactionsWindow: () => void;
  handleCancelNotPaidTransactionsWindow: () => void;
  handleEditTransactionValueWindow: () => void;
  handleEventSupplierAgreementTransactionsWindow: () => void;
  handleUpdateAgreementAndTransactions: (data: IUpdateAgreementAndTransactionsDTO) => IUpdateEventSupplierTransactionAgreementDTO;
  selectSupplierCategory: (category: string) => Promise<void>;
  selectSupplierSubCategory: (subCategory: ISupplierSubCategoryDTO) => void;
  selectSupplierTransactionAgreement: (agreement: IEventSupplierTransactionAgreementDTO) => void;
  selectSupplierTransaction: (supplierTransaction: IEventSupplierTransactionDTO) => void;
  updateEventSupplierTransactionAgreement: (agreement: IEventSupplierTransactionAgreementDTO) => Promise<void>;
  updateEventSupplier: (data: IEventSupplierDTO) => Promise<void>;
  unsetEventSuppliersVariables:() => void;
}

const EventSuppliersContext = createContext({} as EventSuppliersContextType);

const EventSuppliersProvider: React.FC = ({ children }) => {
  const {
    eventSuppliers,
    getEventSuppliers,
    selectedEvent,
    selectedSupplier,
    selectSupplier,
  } = useMyEvent();

  const [addSupplierWindow, setAddSupplierWindow] = useState(false);
  const [createSupplierTransactionAgreementWindow, setCreateSupplierTransactionAgreementWindow] = useState(false);
  const [createSupplierTransactionsWindow, setCreateSupplierTransactionsWindow] = useState(false);
  const [cancelAgreementsWindow, setCancelAllAgreementsWindow] = useState(false);
  const [cancelFutureTransactionsWindow, setCancelFutureTransactionsWindow] = useState(false);
  const [cancelNotPaidTransactionsWindow, setCancelNotPaidTransactionsWindow] = useState(false);
  const [dischargeOption, setDischargeOption] = useState('');
  const [dischargingWindow, setDischargingWindow] = useState(false);
  const [editTransactionValueWindow, setEditTransactionValueWindow] = useState(false);
  const [eventSupplierAgreementTransactionsWindow, setEventSupplierAgreementTransactionsWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [supplierCategoryWindow, setSupplierCategoryWindow] = useState(false);
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState('');
  const [selectedSupplierSubCategory, setSelectedSupplierSubCategory] = useState({} as ISupplierSubCategoryDTO);
  const [selectedSupplierTransactionAgreement, setSelectedSupplierTransactionAgreement] = useState({} as IEventSupplierTransactionAgreementDTO);
  const [selectedSupplierTransaction, setSelectedSupplierTransaction] = useState({} as IEventSupplierTransactionDTO);
  const [supplierAgreementTransactions, setSupplierAgreementTransactions] = useState<IEventSupplierTransactionDTO[]>([]);
  const [supplierSubCategoryWindow, setSupplierSubCategoryWindow] = useState(false);
  const [supplierSubCategories, setSupplierSubCategories] = useState<ISupplierSubCategoryDTO[]>([]);
  const [supplierTransactionsWindow, setSupplierTransactionsWindow] = useState(false);

  function unsetEventSuppliersVariables() {
    setAddSupplierWindow(false);
    setCreateSupplierTransactionAgreementWindow(false);
    setCreateSupplierTransactionsWindow(false);
    setCancelAllAgreementsWindow(false);
    setCancelFutureTransactionsWindow(false);
    setCancelNotPaidTransactionsWindow(false);
    setDischargeOption('');
    setDischargingWindow(false);
    setEditTransactionValueWindow(false);
    setEventSupplierAgreementTransactionsWindow(false);
    setLoading(false);
    setSupplierCategoryWindow(false);
    setSelectedSupplierCategory('');
    setSelectedSupplierSubCategory({} as ISupplierSubCategoryDTO);
    setSelectedSupplierTransactionAgreement({} as IEventSupplierTransactionAgreementDTO);
    setSelectedSupplierTransaction({} as IEventSupplierTransactionDTO);
    setSupplierAgreementTransactions([]);
    setSupplierSubCategoryWindow(false);
    setSupplierSubCategories([]);
    setSupplierTransactionsWindow(false);
  }

  function handleUpdateAgreementAndTransactions({
    id,
    transactions,
  }: IUpdateAgreementAndTransactionsDTO): IUpdateEventSupplierTransactionAgreementDTO {
    const updatedAgreement: IEventSupplierTransactionAgreementDTO[] = []
    eventSuppliers.map(supplier => {
      supplier.transactionAgreements.map(agreement => {
        agreement.id === id && updatedAgreement.push(agreement);
      });
      return supplier;
    });
    const updatedTransactions = updatedAgreement[0].transactions.map(transaction => {
      const findTransaction = transactions.find(item => item.id === transaction.transaction.id)
      if (findTransaction) {
        return findTransaction;
      }
      return transaction.transaction;
    });
    const newAmount = updatedTransactions
      .filter(transaction => !transaction.isCancelled)
      .map(transaction => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    const newNumberOfInstallments = updatedTransactions
      .filter(transaction => !transaction.isCancelled && transaction.amount !== 0).length;
    return {
      id,
      amount: newAmount,
      number_of_installments: newNumberOfInstallments,
      isCancelled: newAmount === 0,
      transactions: updatedTransactions,
    }
  }

  function handleDichargeOption(data: string) {
    setDischargeOption(data);
  }
  function handleAddSupplierWindow() {
    setAddSupplierWindow(!addSupplierWindow)
  }

  function handleEditTransactionValueWindow() {
    setEditTransactionValueWindow(!editTransactionValueWindow)
  }

  function handleDischargingWindow() {
    setDischargingWindow(!dischargingWindow)
  }

  function handleEventSupplierAgreementTransactionsWindow() {
    setEventSupplierAgreementTransactionsWindow(!eventSupplierAgreementTransactionsWindow)
  }

  function handleSupplierCategoryWindow() {
    setSupplierCategoryWindow(!supplierCategoryWindow)
  }

  function handleSupplierTransactionsWindow() {
    setSupplierTransactionsWindow(!supplierTransactionsWindow)
  }

  function handleSupplierSubCategoryWindow() {
    setSupplierSubCategoryWindow(!supplierSubCategoryWindow)
  }

  function handleCreateSupplierTransactionAgreementWindow() {
    setCreateSupplierTransactionAgreementWindow(!createSupplierTransactionAgreementWindow)
  }

  function handleCreateSupplierTransactionsWindow() {
    setCreateSupplierTransactionsWindow(!createSupplierTransactionsWindow)
  }

  function handleCancelFutureTransactionsWindow() {
    setCancelFutureTransactionsWindow(!cancelFutureTransactionsWindow)
  }

  function handleCancelNotPaidTransactionsWindow() {
    setCancelNotPaidTransactionsWindow(!cancelNotPaidTransactionsWindow)
  }

  function handleCancelAllAgreementsWindow() {
    setCancelAllAgreementsWindow(!cancelAgreementsWindow)
  }

  async function createEventSuppliers({
    isHired,
    name,
    supplier_sub_category,
    weplanUser,
  }: ICreateEventSupplierDTO) {
    try {
      setLoading(true);
      const response = await api.post(`/event-suppliers/${selectedEvent.id}`, {
        isHired,
        name,
        supplier_sub_category,
        weplanUser,
      });

      await getEventSuppliers(selectedEvent.id);
      if (isHired) {
        selectSupplier(response.data);
        handleCreateSupplierTransactionAgreementWindow();
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateEventSupplier({
    id,
    isHired,
    isDischarged,
    name,
    supplier_sub_category,
    weplanUser,
  }: IEventSupplierDTO) {
    try {
      setLoading(true);
      const response = await api.put(`/event-suppliers/${id}`, {
        isHired,
        isDischarged,
        name,
        supplier_sub_category,
        weplanUser,
      });
      selectSupplier(response.data);
      await getEventSuppliers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function getEventSupplierTransactionAgreements(supplier_id: string) {
    try {
      const response = await api.get<
        IEventSupplierTransactionAgreementDTO[]
      >(`/event-supplier-transaction-agreements/${supplier_id}`);

      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function updateEventSupplierTransactionAgreement({
    id,
    amount,
    number_of_installments,
  }: IEventSupplierTransactionAgreementDTO) {
    try {
      const response = await api.put(`/event-supplier-transaction-agreements/`, {
        id,
        amount,
        number_of_installments,
      });
      response.data && setSelectedSupplierTransactionAgreement(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventSupplierTransactions(agreement_id: string) {
    try {
      const response = await api.get<
        IEventSupplierTransactionDTO[]
      >(`/event-supplier-transactions/${agreement_id}`);

      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getSupplierSubCategories() {
    if (selectedSupplierCategory !== '')
    try {
      const response = await api.get(`/supplier-sub-categories/${selectedSupplierCategory}`);
      setSupplierSubCategories(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  function selectSupplierSubCategory(subCategory: ISupplierSubCategoryDTO) {
    setSelectedSupplierSubCategory(subCategory);
  }

  function selectSupplierTransactionAgreement(agreement: IEventSupplierTransactionAgreementDTO) {
    setSelectedSupplierTransactionAgreement(agreement);
  }

  function selectSupplierTransaction(supplierTransaction: IEventSupplierTransactionDTO) {
    setSelectedSupplierTransaction(supplierTransaction);
  }

  async function selectSupplierCategory(category: string) {
    setSelectedSupplierCategory(category);
    if (category === '') {
      setSelectedSupplierSubCategory({} as ISupplierSubCategoryDTO)
      return setSupplierSubCategories([]);
    }
    await getSupplierSubCategories();
  }

  const supplierTransactions = useMemo(() => {
    if (selectedSupplier && selectedSupplier.id) {
      const transactions: ITransactionDTO[] = [];
      selectedSupplier.transactionAgreements.map(agreement =>
        agreement.transactions
          .filter(transaction => !transaction.transaction.isCancelled)
          .map(transaction => transactions.push(transaction.transaction)),
      );
      transactions.sort((a, b) => {
        if (new Date(a.due_date) > new Date(b.due_date)) return 1
        if (new Date(a.due_date) < new Date(b.due_date)) return -1
        return 0
      });
      return transactions;
    }
  }, [selectedSupplier]);

  useEffect(() => {
    if (selectedSupplier && selectedSupplier.id) {
      const transactions: IEventSupplierTransactionDTO[] = [];
      selectedSupplier.transactionAgreements
        .filter(agreement => !agreement.isCancelled)
        .map(agreement => {
          agreement.transactions
            .filter(transaction => !transaction.transaction.isCancelled)
            .map(transaction => transactions.push(transaction));
          return agreement;
        });

      setSupplierAgreementTransactions(transactions
        .filter(transaction => !transaction.transaction.isCancelled)
        .sort((a, b) => {
          if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date)) return 1
          if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date)) return -1
          return 0
        }));
    }
  }, [selectedSupplier]);

  return (
    <EventSuppliersContext.Provider
      value={{
        addSupplierWindow,
        createSupplierTransactionAgreementWindow,
        createSupplierTransactionsWindow,
        cancelAgreementsWindow,
        createEventSuppliers,
        dischargeOption,
        dischargingWindow,
        editTransactionValueWindow,
        eventSupplierAgreementTransactionsWindow,
        getEventSupplierTransactionAgreements,
        getEventSupplierTransactions,
        handleAddSupplierWindow,
        handleCreateSupplierTransactionAgreementWindow,
        handleCreateSupplierTransactionsWindow,
        handleCancelAllAgreementsWindow,
        handleCancelFutureTransactionsWindow,
        handleCancelNotPaidTransactionsWindow,
        handleDichargeOption,
        handleDischargingWindow,
        handleEditTransactionValueWindow,
        handleEventSupplierAgreementTransactionsWindow,
        handleSupplierCategoryWindow,
        handleSupplierSubCategoryWindow,
        handleSupplierTransactionsWindow,
        handleUpdateAgreementAndTransactions,
        loading,
        selectedSupplierSubCategory,
        selectedSupplierCategory,
        selectedSupplierTransactionAgreement,
        selectedSupplierTransaction,
        selectSupplierCategory,
        selectSupplierSubCategory,
        selectSupplierTransactionAgreement,
        selectSupplierTransaction,
        supplierCategoryWindow,
        supplierSubCategoryWindow,
        supplierTransactionsWindow,
        supplierAgreementTransactions,
        supplierSubCategories,
        supplierTransactions,
        updateEventSupplier,
        updateEventSupplierTransactionAgreement,
        unsetEventSuppliersVariables,
      }}
    >
      {children}
    </EventSuppliersContext.Provider>
  );
};

function useEventSuppliers(): EventSuppliersContextType {
  const context = useContext(EventSuppliersContext);

  if (!context) throw new Error('useEventSuppliers must be used within an AuthProvider');
  return context;
}

export { EventSuppliersProvider, useEventSuppliers };
