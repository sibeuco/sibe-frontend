import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeportesSubareaActivityAttendanceRecordComponent } from './deportes-subarea-activity-attendance-record.component';

describe('DeportesSubareaActivityAttendanceRecordComponent', () => {
  let component: DeportesSubareaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<DeportesSubareaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeportesSubareaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(DeportesSubareaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
