import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidobjAttributeDialogComponent } from './rfidobj-attribute-dialog.component';

describe('RfidobjAttributeDialogComponent', () => {
  let component: RfidobjAttributeDialogComponent;
  let fixture: ComponentFixture<RfidobjAttributeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidobjAttributeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidobjAttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
