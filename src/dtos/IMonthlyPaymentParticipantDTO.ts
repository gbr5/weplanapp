import ICreateTransactionDTO from "./ICreateTransactionDTO";

export default interface IMonthlyPaymentParticipantDTO {
  participant_id: string;
  participant_type: string;
  transactions: ICreateTransactionDTO[];
}
