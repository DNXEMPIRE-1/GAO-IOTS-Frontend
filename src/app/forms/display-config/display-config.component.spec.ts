import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayConfigComponent } from './display-config.component';

describe('DisplayConfigComponent', () => {
  let component: DisplayConfigComponent;
  let fixture: ComponentFixture<DisplayConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
