import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInventoryAdjustmentComponent } from './show-inventory-adjustment.component';

describe('ShowInventoryAdjustmentComponent', () => {
  let component: ShowInventoryAdjustmentComponent;
  let fixture: ComponentFixture<ShowInventoryAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInventoryAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowInventoryAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
