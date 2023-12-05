import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidobjectFormComponent } from './rfidobject-form.component';

describe('RfidobjectFormComponent', () => {
  let component: RfidobjectFormComponent;
  let fixture: ComponentFixture<RfidobjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidobjectFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidobjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
