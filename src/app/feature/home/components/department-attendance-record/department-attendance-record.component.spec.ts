import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAttendanceRecordComponent } from './department-attendance-record.component';

describe('DepartmentAttendanceRecordComponent', () => {
  let component: DepartmentAttendanceRecordComponent;
  let fixture: ComponentFixture<DepartmentAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(DepartmentAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
