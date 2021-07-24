import React, {
  useContext,
  createContext,
  useState,
} from 'react';
import ICreateEventSupplierDTO from '../dtos/ICreateEventSupplierDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import IEventSupplierTransactionDTO from '../dtos/IEventSupplierTransactionDTO';
import ISupplierSubCategoryDTO from '../dtos/ISupplierSubCategoryDTO';


import api from '../services/api';

import { useMyEvent } from './myEvent';

interface EventSuppliersContextType {
  loading: boolean;
  addSupplierWindow: boolean;
  supplierCategoryWindow: boolean;
  supplierSubCategoryWindow: boolean;
  createSupplierTransactionAgreementWindow: boolean;
  createSupplierTransactionsWindow: boolean;
  selectedSupplierCategory: string;
  selectedSupplierSubCategory: ISupplierSubCategoryDTO;
  supplierSubCategories: ISupplierSubCategoryDTO[];
  selectedSupplierTransactionAgreement: IEventSupplierTransactionAgreementDTO;
  selectedSupplierTransaction: IEventSupplierTransactionDTO;
  createEventSuppliers: (data: ICreateEventSupplierDTO) => Promise<void>;
  selectSupplierCategory: (category: string) => Promise<void>;
  selectSupplierSubCategory: (subCategory: ISupplierSubCategoryDTO) => void;
  selectSupplierTransactionAgreement: (agreement: IEventSupplierTransactionAgreementDTO) => void;
  selectSupplierTransaction: (supplierTransaction: IEventSupplierTransactionDTO) => void;
  handleAddSupplierWindow: () => void;
  handleSupplierCategoryWindow: () => void;
  handleSupplierSubCategoryWindow: () => void;
  handleCreateSupplierTransactionAgreementWindow: () => void;
  handleCreateSupplierTransactionsWindow: () => void;
  updateEventSuppliers: (data: IEventSupplierDTO) => Promise<void>;
  getEventSupplierTransactionAgreements: (supplier_id: string) => Promise<IEventSupplierTransactionAgreementDTO[]>;
  getEventSupplierTransactions: (agreement_id: string) => Promise<IEventSupplierTransactionDTO[]>;
}

const EventSuppliersContext = createContext({} as EventSuppliersContextType);

const EventSuppliersProvider: React.FC = ({ children }) => {
  const { selectedEvent, getEventSuppliers, selectSupplier, selectedSupplier } = useMyEvent();

  const [loading, setLoading] = useState(false);
  const [addSupplierWindow, setAddSupplierWindow] = useState(false);
  const [supplierCategoryWindow, setSupplierCategoryWindow] = useState(false);
  const [supplierSubCategoryWindow, setSupplierSubCategoryWindow] = useState(false);
  const [createSupplierTransactionAgreementWindow, setCreateSupplierTransactionAgreementWindow] = useState(false);
  const [createSupplierTransactionsWindow, setCreateSupplierTransactionsWindow] = useState(false);
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState('');
  const [supplierSubCategories, setSupplierSubCategories] = useState<ISupplierSubCategoryDTO[]>([]);
  const [selectedSupplierSubCategory, setSelectedSupplierSubCategory] = useState({} as ISupplierSubCategoryDTO);
  const [selectedSupplierTransactionAgreement, setSelectedSupplierTransactionAgreement] = useState({} as IEventSupplierTransactionAgreementDTO);
  const [selectedSupplierTransaction, setSelectedSupplierTransaction] = useState({} as IEventSupplierTransactionDTO);

  function handleAddSupplierWindow() {
    setAddSupplierWindow(!addSupplierWindow)
  }

  function handleSupplierCategoryWindow() {
    setSupplierCategoryWindow(!supplierCategoryWindow)
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

  async function updateEventSuppliers({
    id,
    isHired,
    name,
    supplier_sub_category,
    weplanUser,
  }: IEventSupplierDTO) {
    try {
      setLoading(true);
      const response = await api.put(`/event-suppliers/${id}`, {
        isHired,
        name,
        supplier_sub_category,
        weplanUser,
      });
      await getEventSuppliers(selectedEvent.id);
      if (isHired && !selectedSupplier.isHired) {
        selectSupplier(response.data);
        handleCreateSupplierTransactionAgreementWindow();
      }
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

  return (
    <EventSuppliersContext.Provider
      value={{
        loading,
        addSupplierWindow,
        supplierCategoryWindow,
        supplierSubCategoryWindow,
        createSupplierTransactionAgreementWindow,
        createSupplierTransactionsWindow,
        supplierSubCategories,
        selectedSupplierSubCategory,
        selectedSupplierCategory,
        selectedSupplierTransactionAgreement,
        selectedSupplierTransaction,
        selectSupplierCategory,
        selectSupplierSubCategory,
        selectSupplierTransactionAgreement,
        selectSupplierTransaction,
        createEventSuppliers,
        updateEventSuppliers,
        handleAddSupplierWindow,
        handleSupplierCategoryWindow,
        handleSupplierSubCategoryWindow,
        handleCreateSupplierTransactionAgreementWindow,
        handleCreateSupplierTransactionsWindow,
        getEventSupplierTransactionAgreements,
        getEventSupplierTransactions,
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
