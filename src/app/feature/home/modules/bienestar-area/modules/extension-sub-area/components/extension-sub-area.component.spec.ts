import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionSubAreaComponent } from './extension-sub-area.component';

describe('ExtensionSubAreaComponent', () => {
  let component: ExtensionSubAreaComponent;
  let fixture: ComponentFixture<ExtensionSubAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtensionSubAreaComponent]
    });
    fixture = TestBed.createComponent(ExtensionSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
