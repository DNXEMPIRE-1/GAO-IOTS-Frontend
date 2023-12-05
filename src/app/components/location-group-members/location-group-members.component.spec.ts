import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGroupMembersComponent } from './location-group-members.component';

describe('LocationGroupMembersComponent', () => {
  let component: LocationGroupMembersComponent;
  let fixture: ComponentFixture<LocationGroupMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationGroupMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationGroupMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
