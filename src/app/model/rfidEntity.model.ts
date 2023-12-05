import { EntityAttribute } from "./entityAttribute.model";
export class RfidEntity {

  public id: string;
  public name: string;
  public classId: string;
  public createDate: Date;
  public tagid: string;
  public groupId : string | null;
  public image?: string; // base64 encoded image
  public attributes: Array<EntityAttribute>;

  constructor(id?: string,classId?: string, name?: string, createDate?: Date,tagid?: string,
    attributes?: Array<EntityAttribute>){
        this.id = id || "";
        this.classId = classId || '';
        this.name = name || '';
        this.createDate = createDate || new Date();
        this.tagid = tagid || '';
        this.attributes = attributes || new Array<EntityAttribute>;
  }

}
