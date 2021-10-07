import IEventMemberTransactionAgreementDTO from "./IEventMemberTransactionAgreementDTO";
import IEventOwnerTransactionAgreementDTO from "./IEventOwnerTransactionAgreementDTO";

export default interface IEventMonthlyPaymentAgreementDTO {
  id: string;
  event_id: string;
  name: string;
  monthly_payment: number;
  number_of_installments: number;
  start_date: Date;
  created_at: Date;
  updated_at: Date;
  // memberAgreements: [];
  eventMemberTransactionAgreements: IEventMemberTransactionAgreementDTO[];
  // ownerAgreements: [];
  eventOwnerTransactionAgreements: IEventOwnerTransactionAgreementDTO[];
}
