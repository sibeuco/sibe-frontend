import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTopImageComponent } from './area-top-image.component';

describe('AreaTopImageComponent', () => {
  let component: AreaTopImageComponent;
  let fixture: ComponentFixture<AreaTopImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaTopImageComponent]
    });
    fixture = TestBed.createComponent(AreaTopImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
