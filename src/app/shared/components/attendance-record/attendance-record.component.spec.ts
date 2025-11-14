import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AttendanceRecordComponent } from './attendance-record.component';
import { UniversityMemberService } from '../../service/university-member.service';

describe('AttendanceRecordComponent', () => {
  let component: AttendanceRecordComponent;
  let fixture: ComponentFixture<AttendanceRecordComponent>;
  const universityMemberServiceStub = {
    consultarPorCarnet: jasmine.createSpy('consultarPorCarnet').and.returnValue(of(null)),
    consultarPorIdentificacion: jasmine.createSpy('consultarPorIdentificacion').and.returnValue(of(null))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceRecordComponent],
      providers: [
        { provide: UniversityMemberService, useValue: universityMemberServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
