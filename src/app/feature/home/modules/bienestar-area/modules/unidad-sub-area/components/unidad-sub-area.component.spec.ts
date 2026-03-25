import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadSubAreaComponent } from './unidad-sub-area.component';

describe('UnidadSubAreaComponent', () => {
  let component: UnidadSubAreaComponent;
  let fixture: ComponentFixture<UnidadSubAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadSubAreaComponent]
    });
    fixture = TestBed.createComponent(UnidadSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
