import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDataContainerComponent } from './top-data-container.component';

describe('TopDataContainerComponent', () => {
  let component: TopDataContainerComponent;
  let fixture: ComponentFixture<TopDataContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopDataContainerComponent]
    });
    fixture = TestBed.createComponent(TopDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
