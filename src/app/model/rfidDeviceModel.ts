import { EntityAttribute } from "./entityAttribute.model";
import { Antenna } from "./antenna";
export interface RfidDeviceModel
{
  id: string;
  name: string;
  driverClass?: string;
  createDate: Date;
  attributes: EntityAttribute[];
  antennas: Antenna[];
}
