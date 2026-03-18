import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalParticipantsMonthsComponent } from './total-participants-months.component';

describe('TotalParticipantsMonthsComponent', () => {
  let component: TotalParticipantsMonthsComponent;
  let fixture: ComponentFixture<TotalParticipantsMonthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalParticipantsMonthsComponent]
    });
    fixture = TestBed.createComponent(TotalParticipantsMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
