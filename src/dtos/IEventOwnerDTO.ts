import IEventDTO from './IEventDTO';
import IEventOwnerTransactionAgreementDTO from './IEventOwnerTransactionAgreementDTO';
import IUserDTO from './IUserDTO';

export default interface IEventOwnerDTO {
  id: string;
  event_id: string;
  event: IEventDTO;
  description: string;
  number_of_guests: number;
  userEventOwner: IUserDTO;
  // event_avatar_url?: string;
  transactionAgreements: IEventOwnerTransactionAgreementDTO[];
  created_at: Date;
  updated_at: Date;
}
