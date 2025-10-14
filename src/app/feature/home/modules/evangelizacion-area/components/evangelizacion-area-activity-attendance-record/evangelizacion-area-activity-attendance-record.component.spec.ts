import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvangelizacionAreaActivityAttendanceRecordComponent } from './evangelizacion-area-activity-attendance-record.component';

describe('EvangelizacionAreaActivityAttendanceRecordComponent', () => {
  let component: EvangelizacionAreaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<EvangelizacionAreaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvangelizacionAreaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(EvangelizacionAreaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
