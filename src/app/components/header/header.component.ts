import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { SidenavService } from 'src/app/sidenav/sidenav.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user = new User();

  constructor(private sideNavService: SidenavService) {}

  ngOnInit() {
    if (sessionStorage.getItem('userdetails')) {
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
  }

  toggleSideNav(e: Event) {
    e.stopPropagation();
    this.sideNavService.toggle();
  }
}
