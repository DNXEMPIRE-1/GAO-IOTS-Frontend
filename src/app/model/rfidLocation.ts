import { RfidDevice } from "./rfidDevice";
import { EntityAttribute } from "./entityAttribute.model";
export class RfidLocation {

  public id: string;
  public name: string;
  public parentId: string | null;
  public locationType?: string;
  public groupId: string | null;
  public monitor?: boolean;
  public attributes?: EntityAttribute[];
  public schedules?: string[];
  public image?: string; // base64 encoded image
  public useParentImage?: boolean;
  public x?: number;
  public y?: number;

  constructor(id?: string, name?: string)
  {
        this.id = id || '';
        this.name  = name || '';
        this.useParentImage = false;
  }

}
