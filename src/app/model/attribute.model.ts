import { FieldTypes } from "../constants/fieldtypes.constants";
export class ObjAttribute {

  public id: string;
  public name: string;
  public type: string;
  public value?: any;
  public defaultValue?: any;
  public required: boolean;
  public order : number;
  public selections: string[] = new Array<string>();

  constructor(id?: string,name?: string, type?: string, defaultValue?: any, required?: boolean, order?: number){
        this.id = id || '';
        this.name = name || '';
        this.type = type || 'String';
        this.defaultValue  = defaultValue|| '';
        this.required = required || true;
        this.order = order || 0;
  }

}
