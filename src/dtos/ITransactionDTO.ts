export default interface ITransactionDTO {
  id: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
  isCancelled: boolean;
  payer_id: string;
  payee_id: string;
  created_at: Date;
  updated_at: Date;
}
