import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingAppComponent } from './saving-app.component';

describe('SavingAppComponent', () => {
  let component: SavingAppComponent;
  let fixture: ComponentFixture<SavingAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingAppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SavingAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Food2Desk' title`, () => {
    const fixture = TestBed.createComponent(SavingAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Food2Desk');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SavingAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Food2Desk');
  });
});
