import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanamientoSubareaActivityAttendanceRecordComponent } from './acompanamiento-subarea-activity-attendance-record.component';

describe('AcompanamientoSubareaActivityAttendanceRecordComponent', () => {
  let component: AcompanamientoSubareaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<AcompanamientoSubareaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcompanamientoSubareaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(AcompanamientoSubareaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
