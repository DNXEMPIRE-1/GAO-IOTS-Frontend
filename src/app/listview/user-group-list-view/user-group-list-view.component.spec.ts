import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupListViewComponent } from './user-group-list-view.component';

describe('UserGroupListViewComponent', () => {
  let component: UserGroupListViewComponent;
  let fixture: ComponentFixture<UserGroupListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
