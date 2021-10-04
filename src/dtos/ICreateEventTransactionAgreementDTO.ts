import ICreateTransactionDTO from "./ICreateTransactionDTO";

export default interface ICreateEventTransactionAgreementDTO {
  participant_id: string;
  participant_type: string;
  amount: number;
  number_of_installments: number;
  transactions: ICreateTransactionDTO[];
}
