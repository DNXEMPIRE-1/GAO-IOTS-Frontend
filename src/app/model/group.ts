import { LocationAccessSchedule } from "./location_access_schedule";

export interface Group
{
  id: string;
  name: string;
  count: number;
  type: number;
  description?: string;
  locationAccessSchedules?: LocationAccessSchedule[];
}
