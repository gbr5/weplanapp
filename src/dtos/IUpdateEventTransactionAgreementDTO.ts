import ITransactionDTO from "./ITransactionDTO";

export default interface IUpdateEventTransactionAgreementDTO {
  id: string;
  amount: number;
  number_of_installments: number;
  isCancelled: boolean;
  agreement_type: string;
  transactions?: ITransactionDTO[];
}
