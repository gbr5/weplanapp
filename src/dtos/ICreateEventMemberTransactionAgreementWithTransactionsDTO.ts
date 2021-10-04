import ICreateTransactionDTO from "./ICreateTransactionDTO";

export default interface ICreateEventMemberTransactionAgreementWithTransactionsDTO {
  member_id: string;
  amount: number;
  number_of_installments: number;
  transactions: ICreateTransactionDTO[];
}
