import { EntityAttribute } from "./entityAttribute.model";
export interface LocationType {

  id: string
  name: string;
  description?: string;
  createDate: Date;
  attributes: Array<EntityAttribute>;
}
