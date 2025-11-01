import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchaSubAreaComponent } from './cancha-sub-area.component';

describe('CanchaSubAreaComponent', () => {
  let component: CanchaSubAreaComponent;
  let fixture: ComponentFixture<CanchaSubAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanchaSubAreaComponent]
    });
    fixture = TestBed.createComponent(CanchaSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
