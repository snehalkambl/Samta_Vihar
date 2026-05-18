import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIncome } from './admin-income';

describe('AdminIncome', () => {
  let component: AdminIncome;
  let fixture: ComponentFixture<AdminIncome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIncome],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminIncome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
