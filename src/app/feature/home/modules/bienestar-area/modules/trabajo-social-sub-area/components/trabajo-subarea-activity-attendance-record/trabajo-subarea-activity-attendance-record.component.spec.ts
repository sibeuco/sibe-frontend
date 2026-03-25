import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoSubareaActivityAttendanceRecordComponent } from './trabajo-subarea-activity-attendance-record.component';

describe('TrabajoSubareaActivityAttendanceRecordComponent', () => {
  let component: TrabajoSubareaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<TrabajoSubareaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrabajoSubareaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(TrabajoSubareaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
