import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenDeliveryComponent } from './screen-delivery.component';

describe('ScreenDeliveryComponent', () => {
  let component: ScreenDeliveryComponent;
  let fixture: ComponentFixture<ScreenDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
