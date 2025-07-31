import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAreaComponent } from './servicio-area.component';

describe('ServicioAreaComponent', () => {
  let component: ServicioAreaComponent;
  let fixture: ComponentFixture<ServicioAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioAreaComponent]
    });
    fixture = TestBed.createComponent(ServicioAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
