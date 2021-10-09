export default interface IEventDTO {
  id: string;
  name: string;
  trimmed_name: string;
  user_id: string;
  event_type: string;
  date: Date | string;
  daysTillDate?: number;
  isGuest?: boolean;
  isOwner?: boolean;
  number_of_guests?: number;
  members_number_of_guests?: number;
  isPublished: boolean;
  isNumberOfGuestsRestricted: boolean;
  isDateDefined: boolean;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}
