import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/sidenav/sidenav.service';
import { User } from 'src/app/model/user.model';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  panelName : string = 'dashboard';
  isAdmin: boolean = false;

  @ViewChild('sidenav',{static: true}) public sidenav: MatSidenav;


  user = new User();

  constructor(private sideNavService: SidenavService, private observer: BreakpointObserver) {

  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width:900px)']).subscribe((res)=>{
      if (res.matches)
      {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
      else
      {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  ngOnInit() {

    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      this.sidenav.toggle();
    });

    if (sessionStorage.getItem('userdetails')) {
      this.user = JSON.parse(sessionStorage.getItem('userdetails') || '');
      if (this.user.authorities)
      {
        if (this.user.authorities.indexOf('ROLE_ADMIN') >= 0)
          this.isAdmin = true;
      }
    }
  }
  get getPanelName() {
    return this.panelName;
  }
  setPanelName(panelName: string)
  {
    this.panelName = panelName;
  }
}
