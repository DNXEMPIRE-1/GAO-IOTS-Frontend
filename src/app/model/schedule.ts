import { WeekDaySchedule } from "./weekday-schedule";
import { ScheduleAction } from "./schedule-action";
export interface Schedule
{
  id: string;
  name: string;
  type: number;
  weekDaySchedules: WeekDaySchedule[];
  date: Date;
  actions: ScheduleAction[];
}
