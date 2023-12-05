import { Injectable } from '@angular/core';
import { RfidLocation } from '../model/rfidLocation';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  public selectedLocation: RfidLocation;
  constructor() { }
}
