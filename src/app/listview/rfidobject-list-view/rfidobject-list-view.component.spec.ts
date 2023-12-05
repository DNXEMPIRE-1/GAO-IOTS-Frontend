import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidobjectListViewComponent } from './rfidobject-list-view.component';

describe('RfidobjectListViewComponent', () => {
  let component: RfidobjectListViewComponent;
  let fixture: ComponentFixture<RfidobjectListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidobjectListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidobjectListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
