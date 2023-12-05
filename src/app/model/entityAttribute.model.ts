
export class EntityAttribute {

  public id: string;
  public name: string;
  public type: string;
  public value?: any;
  public selections?: string[];
  public required: boolean;

  constructor(id?: string, name?: string,type?: string, value?: any){
        this.id = id || '';
        this.name = name || '';
        this.type = type || "";
        this.value = value || null;
        this.required = false;
  }
}
