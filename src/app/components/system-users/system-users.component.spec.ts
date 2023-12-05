import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUsersComponent } from './system-users.component';

describe('SystemUsersComponent', () => {
  let component: SystemUsersComponent;
  let fixture: ComponentFixture<SystemUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
