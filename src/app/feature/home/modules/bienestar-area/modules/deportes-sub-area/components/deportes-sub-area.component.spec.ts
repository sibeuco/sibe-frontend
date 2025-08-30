import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeportesSubAreaComponent } from './deportes-sub-area.component';

describe('DeportesSubAreaComponent', () => {
  let component: DeportesSubAreaComponent;
  let fixture: ComponentFixture<DeportesSubAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeportesSubAreaComponent]
    });
    fixture = TestBed.createComponent(DeportesSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
