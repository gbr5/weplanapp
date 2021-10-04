import IEventDTO from './IEventDTO';
import IEventMemberTransactionAgreementDTO from './IEventMemberTransactionAgreementDTO';
import IUserDTO from './IUserDTO';

export default interface IEventMemberDTO {
  id: string;
  event_id: string;
  event: IEventDTO;
  number_of_guests: number;
  userEventMember: IUserDTO;
  event_avatar_url?: string;
  transactionAgreements: IEventMemberTransactionAgreementDTO[];
  created_at: Date;
  upated_at: Date;
}
