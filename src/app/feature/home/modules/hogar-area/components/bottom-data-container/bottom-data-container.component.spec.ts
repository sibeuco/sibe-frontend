import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomDataContainerComponent } from './bottom-data-container.component';

describe('BottomDataContainerComponent', () => {
  let component: BottomDataContainerComponent;
  let fixture: ComponentFixture<BottomDataContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottomDataContainerComponent]
    });
    fixture = TestBed.createComponent(BottomDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
