import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLunchComponent } from './product-lunch.component';

describe('ProductLunchComponent', () => {
  let component: ProductLunchComponent;
  let fixture: ComponentFixture<ProductLunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLunchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
