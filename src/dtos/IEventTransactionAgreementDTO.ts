import IEventTransactionDTO from "./IEventTransactionDTO";

export default interface IEventTransactionAgreementDTO {
  id: string;
  participant_id: string;
  event_id: string;
  participant_type: string;
  participant_name?: string;
  amount: number;
  number_of_installments: number;
  isCancelled: boolean;
  created_at: Date;
  updated_at: Date;
  transactions: IEventTransactionDTO[];
}
