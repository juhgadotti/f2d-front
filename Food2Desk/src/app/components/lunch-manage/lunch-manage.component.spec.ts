import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchManageComponent } from './lunch-manage.component';

describe('LunchManageComponent', () => {
  let component: LunchManageComponent;
  let fixture: ComponentFixture<LunchManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunchManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunchManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
