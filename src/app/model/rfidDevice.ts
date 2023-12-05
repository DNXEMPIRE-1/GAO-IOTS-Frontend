import { RfidDeviceModel } from "./rfidDeviceModel";

export interface RfidDevice {
  id: string;
  name: string;
  macAddress: string;
  ipAddress: string;
  locationId?: string;
  locationX?: number;
  locationY?: number;
  fqdn: string;
  createDate: Date;
  deviceModel?: RfidDeviceModel;
  status?: boolean;
  controlType?: number; // 0 - track/scan, 1 - enter, 2 - exit
}
