import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInventoryAdjustmentComponent } from './register-inventory-adjustment.component';

describe('RegisterInventoryAdjustmentComponent', () => {
  let component: RegisterInventoryAdjustmentComponent;
  let fixture: ComponentFixture<RegisterInventoryAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInventoryAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInventoryAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
