import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalParticipantsComponent } from './total-participants.component';

describe('TotalParticipantsComponent', () => {
  let component: TotalParticipantsComponent;
  let fixture: ComponentFixture<TotalParticipantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalParticipantsComponent]
    });
    fixture = TestBed.createComponent(TotalParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
