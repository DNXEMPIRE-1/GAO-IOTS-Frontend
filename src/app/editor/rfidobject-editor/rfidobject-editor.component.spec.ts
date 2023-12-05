import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidobjectEditorComponent } from './rfidobject-editor.component';

describe('RfidobjectEditorComponent', () => {
  let component: RfidobjectEditorComponent;
  let fixture: ComponentFixture<RfidobjectEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidobjectEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidobjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
