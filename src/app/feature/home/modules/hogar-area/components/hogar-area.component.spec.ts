import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarAreaComponent } from './hogar-area.component';

describe('HogarAreaComponent', () => {
  let component: HogarAreaComponent;
  let fixture: ComponentFixture<HogarAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HogarAreaComponent]
    });
    fixture = TestBed.createComponent(HogarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
