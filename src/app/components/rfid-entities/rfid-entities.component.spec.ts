import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidEntitiesComponent } from './rfid-entities.component';

describe('RfidEntitiesComponent', () => {
  let component: RfidEntitiesComponent;
  let fixture: ComponentFixture<RfidEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidEntitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
