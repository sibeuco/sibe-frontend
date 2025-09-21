import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanamientoSubAreaActivityAttendanceComponent } from './acompanamiento-sub-area-activity-attendance.component';

describe('AcompanamientoSubAreaActivityAttendanceComponent', () => {
  let component: AcompanamientoSubAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<AcompanamientoSubAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcompanamientoSubAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(AcompanamientoSubAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
