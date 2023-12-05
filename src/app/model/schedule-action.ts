import { Permission } from "./permission";
import { TimeRange } from "./time-range";
export interface ScheduleAction
{
  permission: Permission;
  timeRange: TimeRange;
}
