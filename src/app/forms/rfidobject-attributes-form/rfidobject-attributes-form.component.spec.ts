import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidobjectAttributesFormComponent } from './rfidobject-attributes-form.component';

describe('RfidobjectAttributesFormComponent', () => {
  let component: RfidobjectAttributesFormComponent;
  let fixture: ComponentFixture<RfidobjectAttributesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidobjectAttributesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidobjectAttributesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
