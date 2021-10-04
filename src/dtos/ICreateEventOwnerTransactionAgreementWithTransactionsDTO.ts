import ICreateTransactionDTO from "./ICreateTransactionDTO";

export default interface ICreateEventOwnerTransactionAgreementWithTransactionsDTO {
  owner_id: string;
  amount: number;
  number_of_installments: number;
  transactions: ICreateTransactionDTO[];
}
