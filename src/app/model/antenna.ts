export interface Antenna
{
  uuid: string; // identifer for the device
  isEnabled : boolean;
	locationId? : string;
  locationX?: number;
  locationY?: number;
	controlType: number;
	gopPort  : number;
	transmitPower : number;
	sensitivity   : number;
}
