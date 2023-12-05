import { AccessHistory } from "./access-history";

export interface EntityTimeData
{
  entityId: string;
	entityName: string;
  image: string;
	totalHours: number;
	timestamp: number;
  accessHistoryList: AccessHistory[];
}
