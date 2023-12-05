import {RfidLocation} from './rfidLocation'
export interface LocationNode {
  location: RfidLocation;
  children?: LocationNode[];
}
