import ITransactionDTO from "./ITransactionDTO";

export default interface IEventOwnerTransactionDTO {
  id: string;
  agreement_id: string;
  transaction_id: string;
  transaction: ITransactionDTO;
}
