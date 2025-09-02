import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanamientoSubAreaComponent } from './acompanamiento-sub-area.component';

describe('AcompanamientoSubAreaComponent', () => {
  let component: AcompanamientoSubAreaComponent;
  let fixture: ComponentFixture<AcompanamientoSubAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcompanamientoSubAreaComponent]
    });
    fixture = TestBed.createComponent(AcompanamientoSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
