export interface AccessHistory
{
  id: string;
  entityId: string;
	entityName: string;
	locationId: string;
	locationName: string;
	tagId: string;
	eventType: number; // 0 scanOnly, 1 enter, 2 leave, 3 unauthorized
	timestamp: number;
	adjustment: boolean; // added by system administrator manually
	valid: boolean; // duplicated event, etc
}
