import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvangelizacionAreaComponent } from './evangelizacion-area.component';

describe('EvangelizacionAreaComponent', () => {
  let component: EvangelizacionAreaComponent;
  let fixture: ComponentFixture<EvangelizacionAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvangelizacionAreaComponent]
    });
    fixture = TestBed.createComponent(EvangelizacionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
