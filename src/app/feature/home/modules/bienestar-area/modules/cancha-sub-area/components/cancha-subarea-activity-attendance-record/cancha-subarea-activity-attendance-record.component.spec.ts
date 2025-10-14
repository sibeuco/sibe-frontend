import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchaSubareaActivityAttendanceRecordComponent } from './cancha-subarea-activity-attendance-record.component';

describe('CanchaSubareaActivityAttendanceRecordComponent', () => {
  let component: CanchaSubareaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<CanchaSubareaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanchaSubareaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(CanchaSubareaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
