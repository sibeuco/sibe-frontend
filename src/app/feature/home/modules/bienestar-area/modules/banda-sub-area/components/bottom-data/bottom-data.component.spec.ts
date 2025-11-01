import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomDataComponent } from './bottom-data.component';

describe('BottomDataComponent', () => {
  let component: BottomDataComponent;
  let fixture: ComponentFixture<BottomDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottomDataComponent]
    });
    fixture = TestBed.createComponent(BottomDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
