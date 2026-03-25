import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandaSubareaActivityAttendanceRecordComponent } from './banda-subarea-activity-attendance-record.component';

describe('BandaSubareaActivityAttendanceRecordComponent', () => {
  let component: BandaSubareaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<BandaSubareaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandaSubareaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(BandaSubareaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
