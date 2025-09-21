import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandaSubAreaActivityAttendanceComponent } from './banda-sub-area-activity-attendance.component';

describe('BandaSubAreaActivityAttendanceComponent', () => {
  let component: BandaSubAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<BandaSubAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandaSubAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(BandaSubAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
