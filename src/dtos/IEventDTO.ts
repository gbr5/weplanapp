import IEventBudgetDTO from './IEventBudgetDTO';
import IEventFileDTO from './IEventFileDTO';
import IEventImageDTO from './IEventImageDTO';
import IEventInfoDTO from './IEventInfoDTO';
import IEventTaskDTO from './IEventTaskDTO';

interface IEventDateDTO {
  id: string;
  date: Date;
}

export default interface IEventDTO {
  id: string;
  name: string;
  trimmed_name: string;
  user_id: string;
  number_of_guests: number;
  event_type: string;
  date: Date | string;
  daysTillDate?: number;
  isGuest?: boolean;
  isOwner?: boolean;
  isPublished: boolean;
  isDateDefined: boolean;
  eventInfo: IEventInfoDTO;
  avatar_url?: string;
  eventDates: IEventDateDTO[];
  eventTasks: IEventTaskDTO[];
  eventFiles: IEventFileDTO[];
  eventImages: IEventImageDTO[];
  eventBudget: IEventBudgetDTO;
}
