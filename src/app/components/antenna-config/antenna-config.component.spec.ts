import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennaConfigComponent } from './antenna-config.component';

describe('AntennaConfigComponent', () => {
  let component: AntennaConfigComponent;
  let fixture: ComponentFixture<AntennaConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntennaConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntennaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
