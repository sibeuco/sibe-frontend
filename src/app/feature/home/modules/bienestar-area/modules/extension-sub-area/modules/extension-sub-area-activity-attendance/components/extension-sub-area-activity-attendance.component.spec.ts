import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionSubAreaActivityAttendanceComponent } from './extension-sub-area-activity-attendance.component';

describe('ExtensionSubAreaActivityAttendanceComponent', () => {
  let component: ExtensionSubAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<ExtensionSubAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtensionSubAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(ExtensionSubAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
