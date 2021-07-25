import IEventSupplierTransactionAgreementDTO from './IEventSupplierTransactionAgreementDTO';
import IUserDTO from './IUserDTO';

interface IEventWeplanSupplier {
  id: string;
  weplanEventSupplier: IUserDTO;
}
export default interface IEventSupplierDTO {
  id: string;
  name: string;
  event_id: string;
  supplier_sub_category: string;
  isHired: boolean;
  weplanUser: boolean;
  created_at: Date;
  updated_at: Date;
  eventWeplanSupplier: IEventWeplanSupplier;
  transactionAgreements: IEventSupplierTransactionAgreementDTO[];
}
