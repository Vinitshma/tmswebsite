import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerApplyComponent } from './career-apply.component';

describe('CareerApplyComponent', () => {
  let component: CareerApplyComponent;
  let fixture: ComponentFixture<CareerApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerApplyComponent]
    });
    fixture = TestBed.createComponent(CareerApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
