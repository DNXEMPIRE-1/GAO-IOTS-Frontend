import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationpropsComponent } from './locationprops.component';

describe('LocationpropsComponent', () => {
  let component: LocationpropsComponent;
  let fixture: ComponentFixture<LocationpropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationpropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationpropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
