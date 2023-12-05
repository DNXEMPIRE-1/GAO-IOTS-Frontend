import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionValueDialogComponent } from './option-value-dialog.component';

describe('OptionValueDialogComponent', () => {
  let component: OptionValueDialogComponent;
  let fixture: ComponentFixture<OptionValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionValueDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
