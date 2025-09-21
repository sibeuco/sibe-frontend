import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GimnasioSubAreaActivityAttendanceComponent } from './gimnasio-sub-area-activity-attendance.component';

describe('GimnasioSubAreaActivityAttendanceComponent', () => {
  let component: GimnasioSubAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<GimnasioSubAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GimnasioSubAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(GimnasioSubAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
