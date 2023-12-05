import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennaFormComponent } from './antenna-form.component';

describe('AntennaFormComponent', () => {
  let component: AntennaFormComponent;
  let fixture: ComponentFixture<AntennaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntennaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntennaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
