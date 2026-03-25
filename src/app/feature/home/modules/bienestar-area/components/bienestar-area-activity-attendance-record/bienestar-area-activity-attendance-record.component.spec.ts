import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienestarAreaActivityAttendanceRecordComponent } from './bienestar-area-activity-attendance-record.component';

describe('BienestarAreaActivityAttendanceRecordComponent', () => {
  let component: BienestarAreaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<BienestarAreaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BienestarAreaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(BienestarAreaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
