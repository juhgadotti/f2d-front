import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLunchComponent } from './order-lunch.component';

describe('OrderLunchComponent', () => {
  let component: OrderLunchComponent;
  let fixture: ComponentFixture<OrderLunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderLunchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
