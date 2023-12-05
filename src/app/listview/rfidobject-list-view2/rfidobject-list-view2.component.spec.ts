import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidobjectListView2Component } from './rfidobject-list-view2.component';

describe('RfidobjectListView2Component', () => {
  let component: RfidobjectListView2Component;
  let fixture: ComponentFixture<RfidobjectListView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidobjectListView2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidobjectListView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
