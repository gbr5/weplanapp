import IMonthlyPaymentParticipantDTO from "./IMonthlyPaymentParticipantDTO";

export default interface ICreateEventParticipantsMonthlyPaymentAgreementsDTO {
  event_id: string;
  name: string;
  monthly_payment: number;
  number_of_installments: number;
  start_date: Date;
  amount: number;
  participants: IMonthlyPaymentParticipantDTO[];
}
