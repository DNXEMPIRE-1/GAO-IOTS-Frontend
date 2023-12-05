import { RfidEntity } from "./rfidEntity.model";

export class Tag {

  public id: string
  public tagId: string;
  public entityId?: string;
  public x?: number;
  public y?: number;
  public activationDate?: Date;
  public expirationDate?: Date;
  public registrationDate: Date;

  constructor(id?: string, tagId?: string, activationDate?: Date, expirationDate?: Date, registrationDate?:Date)
  {
        this.id = id || '';
        this.tagId = tagId || '';
        this.activationDate = activationDate;
        this.expirationDate  = expirationDate;
        this.registrationDate = registrationDate || new Date();

  }

}
