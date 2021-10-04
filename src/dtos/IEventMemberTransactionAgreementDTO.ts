import IEventMemberTransactionDTO from "./IEventMemberTransactionDTO";

export default interface IEventMemberTransactionAgreementDTO {
  id: string;
  member_id: string;
  amount: number;
  number_of_installments: number;
  isCancelled: boolean;
  created_at: Date;
  updated_at: Date;
  transactions: IEventMemberTransactionDTO[];
}
