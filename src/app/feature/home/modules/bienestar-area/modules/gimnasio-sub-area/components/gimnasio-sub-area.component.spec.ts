import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GimnasioSubAreaComponent } from './gimnasio-sub-area.component';

describe('GimnasioSubAreaComponent', () => {
  let component: GimnasioSubAreaComponent;
  let fixture: ComponentFixture<GimnasioSubAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GimnasioSubAreaComponent]
    });
    fixture = TestBed.createComponent(GimnasioSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
