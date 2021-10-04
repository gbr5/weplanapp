import IEventOwnerTransactionDTO from "./IEventOwnerTransactionDTO";

export default interface IEventOwnerTransactionAgreementDTO {
  id: string;
  owner_id: string;
  amount: number;
  number_of_installments: number;
  isCancelled: boolean;
  created_at: Date;
  updated_at: Date;
  transactions: IEventOwnerTransactionDTO[];
}
