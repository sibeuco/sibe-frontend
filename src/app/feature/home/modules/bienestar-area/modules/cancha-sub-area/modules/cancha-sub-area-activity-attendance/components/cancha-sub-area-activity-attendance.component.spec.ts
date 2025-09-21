import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchaSubAreaActivityAttendanceComponent } from './cancha-sub-area-activity-attendance.component';

describe('CanchaSubAreaActivityAttendanceComponent', () => {
  let component: CanchaSubAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<CanchaSubAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanchaSubAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(CanchaSubAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
