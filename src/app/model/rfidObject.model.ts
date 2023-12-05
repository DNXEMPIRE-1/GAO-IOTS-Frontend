import { EntityAttribute } from "./entityAttribute.model";

export class RfidObject {

  public id: string;
  public name: string;
  public description?: string;
  public entityCount: number;
  public createDate: Date;
  public attributes: Array<EntityAttribute>;

  constructor(id?: string,name?: string, entityCount?: number, createDate?: Date, attributes?:Array<EntityAttribute>){
        this.id = id || '';
        this.name = name || '';
        this.entityCount = entityCount || 0;
        this.createDate = createDate || new Date();
        this.attributes = attributes || new Array<EntityAttribute>;
  }

}
