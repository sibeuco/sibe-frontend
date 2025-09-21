import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvangelizacionAreaActivityAttendanceComponent } from './evangelizacion-area-activity-attendance.component';

describe('EvangelizacionAreaActivityAttendanceComponent', () => {
  let component: EvangelizacionAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<EvangelizacionAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvangelizacionAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(EvangelizacionAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
