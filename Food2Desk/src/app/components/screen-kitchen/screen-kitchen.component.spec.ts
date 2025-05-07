import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenKitchenComponent } from './screen-kitchen.component';

describe('ScreenKitchenComponent', () => {
  let component: ScreenKitchenComponent;
  let fixture: ComponentFixture<ScreenKitchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenKitchenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
