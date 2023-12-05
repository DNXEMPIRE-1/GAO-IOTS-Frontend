import { Component, OnInit } from '@angular/core';
import { AppConstants } from "../../constants/app.constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  version: string = AppConstants.version;
  constructor() { }

  ngOnInit(): void {
  }

}
