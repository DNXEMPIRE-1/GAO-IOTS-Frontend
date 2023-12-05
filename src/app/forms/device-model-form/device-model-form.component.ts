import { Component, OnInit, Input } from '@angular/core';
import { RfidDeviceModel } from 'src/app/model/rfidDeviceModel';

@Component({
  selector: 'app-device-model-form',
  templateUrl: './device-model-form.component.html',
  styleUrls: ['./device-model-form.component.css']
})
export class DeviceModelFormComponent implements OnInit {

  @Input()
  deviceModel: RfidDeviceModel;

  constructor() { }

  ngOnInit(): void {
  }

}
