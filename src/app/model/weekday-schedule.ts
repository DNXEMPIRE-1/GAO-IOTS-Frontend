import { TimeRange } from "./time-range";
import { ScheduleAction } from "./schedule-action";
export interface WeekDaySchedule {
  dayIndex: number;
  actions: ScheduleAction[];
}
