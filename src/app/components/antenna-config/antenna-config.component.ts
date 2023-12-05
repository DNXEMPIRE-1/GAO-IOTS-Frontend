import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { DataSharingService } from 'src/app/services/data-sharing.service';
@Component({
  selector: 'app-antenna-config',
  templateUrl: './antenna-config.component.html',
  styleUrls: ['./antenna-config.component.css']
})
export class AntennaConfigComponent implements OnInit {

  @Input() device : RfidDevice;
  @Output() showDevice = new EventEmitter();
  location: RfidLocation;
  draggingLocation: RfidLocation;
  constructor(private dataSharing: DataSharingService) { }

  ngOnInit(): void {
  }

  back(): void {
    this.showDevice.emit();
	}

	updateAntenna() {
    this.showDevice.emit();
	}
  onLocationSelected(location: RfidLocation)
  {
    this.location = location;
  }
  drag(node: RfidLocation) {
    this.dataSharing.selectedLocation = node;
  }
}
