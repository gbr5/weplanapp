import IUserDTO from './IUserDTO';

export default interface IEventOwnerDTO {
  id: string;
  event_id: string;
  description: string;
  number_of_guests: number;
  userEventOwner: IUserDTO;
  // event_avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}
