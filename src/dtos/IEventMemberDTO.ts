import IUserDTO from './IUserDTO';

export default interface IEventMemberDTO {
  id: string;
  event_id: string;
  number_of_guests: number;
  userEventMember: IUserDTO;
  event_avatar_url?: string;
  created_at: Date;
  upated_at: Date;
}
