import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoSocialSubAreaComponent } from './trabajo-social-sub-area.component';

describe('TrabajoSocialSubAreaComponent', () => {
  let component: TrabajoSocialSubAreaComponent;
  let fixture: ComponentFixture<TrabajoSocialSubAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrabajoSocialSubAreaComponent]
    });
    fixture = TestBed.createComponent(TrabajoSocialSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
