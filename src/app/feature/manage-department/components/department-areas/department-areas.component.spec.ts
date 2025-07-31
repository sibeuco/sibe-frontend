import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAreasComponent } from './department-areas.component';

describe('DepartmentAreasComponent', () => {
  let component: DepartmentAreasComponent;
  let fixture: ComponentFixture<DepartmentAreasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentAreasComponent]
    });
    fixture = TestBed.createComponent(DepartmentAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
