import React, {
  useContext,
  createContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import * as ImagePicker from 'expo-image-picker';
import DocumentPicker from 'react-native-document-picker';

import api from '../services/api';
import { useMyEvent } from './myEvent';

import ICreateEventSupplierDTO from '../dtos/ICreateEventSupplierDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import IEventSupplierTransactionDTO from '../dtos/IEventSupplierTransactionDTO';
import ISupplierSubCategoryDTO from '../dtos/ISupplierSubCategoryDTO';
import ITransactionDTO from '../dtos/ITransactionDTO';
import IUpdateEventSupplierTransactionAgreementDTO from '../dtos/IUpdateEventSupplierTransactionAgreementDTO';
import ICreateEventSupplierBudgetDTO from '../dtos/ICreateEventSupplierBudgetDTO';
import IEventSupplierBudgetDTO from '../dtos/IEventSupplierBudgetDTO';
import { useEventVariables } from './eventVariables';
import { useTransaction } from './transactions';

interface IUpdateAgreementAndTransactionsDTO {
  id: string;
  transactions: ITransactionDTO[];
}

interface EventSuppliersContextType {
  addSupplierWindow: boolean;
  createEventWePlanSupplierTaskWindow: boolean;
  eventWePlanSupplierTaskWindow: boolean;
  createSupplierTransactionAgreementWindow: boolean;
  cancelAgreementsWindow: boolean;
  dischargeOption: string;
  dischargingWindow: boolean;
  editSupplierNameWindow: boolean;
  editSupplierBudgetAmountWindow: boolean;
  editSupplierBudgetDescriptionWindow: boolean;
  editSupplierCategoryWindow: boolean;
  eventSupplierAgreementTransactionsWindow: boolean;
  loading: boolean;
  selectedSupplierCategory: string;
  selectedSupplierSubCategory: ISupplierSubCategoryDTO;
  selectedSupplierTransactionAgreement: IEventSupplierTransactionAgreementDTO;
  selectedSupplierTransaction: IEventSupplierTransactionDTO;
  supplierAgreementTransactions: IEventSupplierTransactionDTO[] | undefined;
  supplierCategoryWindow: boolean;
  supplierNotesWindow: boolean;
  supplierFilesWindow: boolean;
  supplierBudgetsWindow: boolean;
  supplierBudgetForm: boolean;
  supplierSubCategoryWindow: boolean;
  supplierSubCategories: ISupplierSubCategoryDTO[];
  supplierTransactionAgreementsWindow: boolean;
  supplierSelectedDateWindow: boolean;
  supplierTransactions: ITransactionDTO[] | undefined;
  supplierSelectedDate: Date;
  selectedSupplierBudget: IEventSupplierBudgetDTO,
  selectSupplierBudget: (data: IEventSupplierBudgetDTO) => void,
  handleSupplierSelectedDate: (date: Date) => void;
  handleSupplierSelectedDateWindow: () => void;
  createEventSuppliers: (data: ICreateEventSupplierDTO) => Promise<void>;
  updateSupplierBudgetDueDate: (due_date: Date) => Promise<void>;
  createSupplierBudget: (data: ICreateEventSupplierBudgetDTO) => Promise<void>;
  updateSupplierBudget: (data: IEventSupplierBudgetDTO) => Promise<void>;
  getEventSupplierTransactionAgreements: (supplier_id: string) => Promise<IEventSupplierTransactionAgreementDTO[]>;
  getEventSupplierTransactions: (agreement_id: string) => Promise<IEventSupplierTransactionDTO[]>;
  handleDichargeOption: (data: string) => void;
  handleAddSupplierWindow: () => void;
  handleCreateEventWePlanSupplierTaskWindow: () => void;
  handleEventWePlanSupplierTaskWindow: () => void;
  handleSupplierTransactionAgreementsWindow: () => void;
  handleDischargingWindow: () => void;
  handleEditSupplierNameWindow: () => void;
  handleEditSupplierCategoryWindow: () => void;
  handleSupplierCategoryWindow: () => void;
  handleSupplierNotesWindow: () => void;
  handleSupplierFilesWindow: () => void;
  handleSupplierBudgetsWindow: () => void;
  handleEditSupplierBudgetAmountWindow: () => void;
  handleEditSupplierBudgetDescriptionWindow: () => void;
  handleSupplierBudgetForm: () => void;
  handleSupplierSubCategoryWindow: () => void;
  handleCreateSupplierTransactionAgreementWindow: () => void;
  handleCancelAllAgreementsWindow: () => void;
  handleCancelFutureTransactionsWindow: () => void;
  handleCancelNotPaidTransactionsWindow: () => void;
  handleEventSupplierAgreementTransactionsWindow: () => void;
  importSupplierFile: (supplier_id: string) => Promise<void>;
  importSupplierImage: (supplier_id: string) => Promise<void>;
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
    selectedEvent,
    selectedEventSupplier,
    selectEventSupplier,
  } = useEventVariables();
  const {
    getEventSuppliers,
    getEventNotes,
  } = useMyEvent();

  const [addSupplierWindow, setAddSupplierWindow] = useState(false);
  const [createEventWePlanSupplierTaskWindow, setCreateEventWePlanSupplierTaskWindow] = useState(false);
  const [eventWePlanSupplierTaskWindow, setEventWePlanSupplierTaskWindow] = useState(false);
  const [supplierNotesWindow, setSupplierNotesWindow] = useState(false);
  const [supplierFilesWindow, setSupplierFilesWindow] = useState(false);
  const [supplierBudgetsWindow, setSupplierBudgetsWindow] = useState(false);
  const [supplierBudgetForm, setSupplierBudgetForm] = useState(false);
  const [createSupplierTransactionAgreementWindow, setCreateSupplierTransactionAgreementWindow] = useState(false);
  const [cancelAgreementsWindow, setCancelAllAgreementsWindow] = useState(false);
  const [cancelFutureTransactionsWindow, setCancelFutureTransactionsWindow] = useState(false);
  const [cancelNotPaidTransactionsWindow, setCancelNotPaidTransactionsWindow] = useState(false);
  const [dischargeOption, setDischargeOption] = useState('');
  const [dischargingWindow, setDischargingWindow] = useState(false);
  const [editSupplierNameWindow, setEditSupplierNameWindow] = useState(false);
  const [editSupplierBudgetAmountWindow, setEditSupplierBudgetAmountWindow] = useState(false);
  const [editSupplierBudgetDescriptionWindow, setEditSupplierBudgetDescriptionWindow] = useState(false);
  const [editSupplierCategoryWindow, setEditSupplierCategoryWindow] = useState(false);
  const [eventSupplierAgreementTransactionsWindow, setEventSupplierAgreementTransactionsWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [supplierCategoryWindow, setSupplierCategoryWindow] = useState(false);
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState('');
  const [selectedSupplierSubCategory, setSelectedSupplierSubCategory] = useState({} as ISupplierSubCategoryDTO);
  const [selectedSupplierTransactionAgreement, setSelectedSupplierTransactionAgreement] = useState({} as IEventSupplierTransactionAgreementDTO);
  const [selectedSupplierTransaction, setSelectedSupplierTransaction] = useState({} as IEventSupplierTransactionDTO);
  const [selectedSupplierBudget, setSelectedSupplierBudget] = useState({} as IEventSupplierBudgetDTO);
  const [supplierAgreementTransactions, setSupplierAgreementTransactions] = useState<IEventSupplierTransactionDTO[]>([]);
  const [supplierSubCategoryWindow, setSupplierSubCategoryWindow] = useState(false);
  const [supplierSubCategories, setSupplierSubCategories] = useState<ISupplierSubCategoryDTO[]>([]);
  const [supplierTransactionAgreementsWindow, setSupplierTransactionAgreementsWindow] = useState(false);
  const [supplierSelectedDateWindow, setSupplierSelectedDateWindow] = useState(false);
  const [supplierSelectedDate, setSupplierSelectedDate] = useState(new Date());

  function handleSupplierSelectedDate(date: Date) {
    setSupplierSelectedDate(date);
  }

  function handleSupplierSelectedDateWindow() {
    setSupplierSelectedDateWindow(!supplierSelectedDateWindow);
  }

  function unsetEventSuppliersVariables() {
    setAddSupplierWindow(false);
    setCreateEventWePlanSupplierTaskWindow(false);
    setCreateSupplierTransactionAgreementWindow(false);
    setCancelAllAgreementsWindow(false);
    setCancelFutureTransactionsWindow(false);
    setCancelNotPaidTransactionsWindow(false);
    setDischargeOption('');
    setDischargingWindow(false);
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
  function handleCreateEventWePlanSupplierTaskWindow() {
    setCreateEventWePlanSupplierTaskWindow(!createEventWePlanSupplierTaskWindow)
  }
  function handleEventWePlanSupplierTaskWindow() {
    setEventWePlanSupplierTaskWindow(!eventWePlanSupplierTaskWindow)
  }
  function handleEditSupplierNameWindow() {
    setEditSupplierNameWindow(!editSupplierNameWindow)
  }
  function handleEditSupplierBudgetAmountWindow() {
    setEditSupplierBudgetAmountWindow(!editSupplierBudgetAmountWindow)
  }
  function handleEditSupplierBudgetDescriptionWindow() {
    setEditSupplierBudgetDescriptionWindow(!editSupplierBudgetDescriptionWindow)
  }
  function handleEditSupplierCategoryWindow() {
    setEditSupplierCategoryWindow(!editSupplierCategoryWindow)
  }
  function handleSupplierNotesWindow() {
    setSupplierNotesWindow(!supplierNotesWindow)
  }
  function handleSupplierFilesWindow() {
    setSupplierFilesWindow(!supplierFilesWindow)
  }
  function handleSupplierBudgetsWindow() {
    setSupplierBudgetsWindow(!supplierBudgetsWindow)
  }
  function handleSupplierBudgetForm() {
    setSupplierBudgetForm(!supplierBudgetForm)
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
  function handleSupplierTransactionAgreementsWindow() {
    setSupplierTransactionAgreementsWindow(!supplierTransactionAgreementsWindow)
  }
  function handleSupplierSubCategoryWindow() {
    setSupplierSubCategoryWindow(!supplierSubCategoryWindow)
  }
  function handleCreateSupplierTransactionAgreementWindow() {
    setCreateSupplierTransactionAgreementWindow(!createSupplierTransactionAgreementWindow)
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
        selectEventSupplier(response.data);
        handleCreateSupplierTransactionAgreementWindow();
      }
    } catch (err: any | unknown) {
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
      selectEventSupplier(response.data);
      await getEventSuppliers(selectedEvent.id);
    } catch (err: any | unknown) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function createSupplierBudget({
    supplier_id,
    amount,
    description,
    due_date,
    isActive,
  }: ICreateEventSupplierBudgetDTO) {
    try {
      setLoading(true);
      await api.post(`/event-supplier-budgets/`, {
        supplier_id,
        amount,
        description,
        due_date,
        isActive,
      });

      await getEventSuppliers(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
    } catch (err: any | unknown) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  async function updateSupplierBudget({
    id,
    amount,
    description,
    due_date,
    isActive,
  }: IEventSupplierBudgetDTO) {
    try {
      setLoading(true);
      await api.put(`/event-supplier-budgets/`, {
        id,
        amount,
        description,
        due_date,
        isActive,
      });

      await getEventSuppliers(selectedEvent.id);
    } catch (err: any | unknown) {
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
    } catch (err: any | unknown) {
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
      await getEventNotes(selectedEvent.id);
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  }
  async function getEventSupplierTransactions(agreement_id: string) {
    try {
      const response = await api.get<
        IEventSupplierTransactionDTO[]
      >(`/event-supplier-transactions/${agreement_id}`);

      return response.data;
    } catch (err: any | unknown) {
      throw new Error(err);
    }
  }
  async function getSupplierSubCategories() {
    if (selectedSupplierCategory !== '')
    try {
      const response = await api.get(`/supplier-sub-categories/${selectedSupplierCategory}`);
      setSupplierSubCategories(response.data);
    } catch (err: any | unknown) {
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
  async function selectSupplierBudget(budget: IEventSupplierBudgetDTO) {
    setSelectedSupplierBudget(budget);
  }
  async function selectSupplierCategory(category: string) {
    setSelectedSupplierCategory(category);
    if (category === '') {
      setSelectedSupplierSubCategory({} as ISupplierSubCategoryDTO)
      return setSupplierSubCategories([]);
    }
    await getSupplierSubCategories();
  }
  async function importSupplierImage(supplier_id: string) {
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
        await api.post(`/event-supplier-files/${supplier_id}`, data);
        await getEventSuppliers(selectedEvent.id);
      }
    } catch (err: any | unknown) {
      // if (DocumentPicker.isCancel(err)) {
      //   return;
      // } else {
      throw new Error(err);
      // }
    } finally {
      setLoading(false);
    }
  }
  async function importSupplierFile(supplier_id: string) {
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
      await api.post(`/event-supplier-files/${supplier_id}`, data);
      await getEventSuppliers(selectedEvent.id);
    } catch (err: any | unknown) {
      if (DocumentPicker.isCancel(err)) {
        return;
      } else {
        throw new Error(err);
      }
    } finally {
      setLoading(false);
    }
  }
  async function updateSupplierBudgetDueDate(due_date: Date) {
    await updateSupplierBudget({
      ...selectedSupplierBudget,
      due_date,
    });
  }
  const supplierTransactions = useMemo(() => {
    if (selectedEventSupplier && selectedEventSupplier.id) {
      const transactions: ITransactionDTO[] = [];
      selectedEventSupplier.transactionAgreements.map(agreement =>
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
  }, [selectedEventSupplier]);
  useEffect(() => {
    if (selectedEventSupplier && selectedEventSupplier.id) {
      const transactions: IEventSupplierTransactionDTO[] = [];
      selectedEventSupplier.transactionAgreements
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
  }, [selectedEventSupplier]);

  return (
    <EventSuppliersContext.Provider
      value={{
        addSupplierWindow,
        handleSupplierSelectedDate,
        supplierSelectedDate,
        updateSupplierBudgetDueDate,
        selectSupplierBudget,
        selectedSupplierBudget,
        createSupplierTransactionAgreementWindow,
        cancelAgreementsWindow,
        createEventSuppliers,
        createSupplierBudget,
        updateSupplierBudget,
        dischargeOption,
        dischargingWindow,
        eventSupplierAgreementTransactionsWindow,
        getEventSupplierTransactionAgreements,
        getEventSupplierTransactions,
        handleAddSupplierWindow,
        handleCreateSupplierTransactionAgreementWindow,
        handleCancelAllAgreementsWindow,
        handleCancelFutureTransactionsWindow,
        handleCancelNotPaidTransactionsWindow,
        handleDichargeOption,
        handleDischargingWindow,
        handleEventSupplierAgreementTransactionsWindow,
        handleSupplierCategoryWindow,
        handleSupplierSubCategoryWindow,
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
        supplierAgreementTransactions,
        supplierSubCategories,
        supplierTransactions,
        updateEventSupplier,
        updateEventSupplierTransactionAgreement,
        unsetEventSuppliersVariables,
        editSupplierCategoryWindow,
        editSupplierNameWindow,
        editSupplierBudgetAmountWindow,
        editSupplierBudgetDescriptionWindow,
        handleEditSupplierCategoryWindow,
        handleEditSupplierNameWindow,
        handleSupplierTransactionAgreementsWindow,
        supplierTransactionAgreementsWindow,
        handleSupplierNotesWindow,
        handleSupplierFilesWindow,
        handleSupplierBudgetsWindow,
        handleEditSupplierBudgetAmountWindow,
        handleEditSupplierBudgetDescriptionWindow,
        supplierNotesWindow,
        supplierFilesWindow,
        supplierBudgetsWindow,
        importSupplierFile,
        importSupplierImage,
        handleSupplierBudgetForm,
        supplierBudgetForm,
        handleSupplierSelectedDateWindow,
        supplierSelectedDateWindow,
        createEventWePlanSupplierTaskWindow,
        eventWePlanSupplierTaskWindow,
        handleEventWePlanSupplierTaskWindow,
        handleCreateEventWePlanSupplierTaskWindow
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
