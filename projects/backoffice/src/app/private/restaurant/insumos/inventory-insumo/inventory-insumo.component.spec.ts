import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryInsumoComponent } from './inventory-insumo.component';

describe('InventoryInsumoComponent', () => {
  let component: InventoryInsumoComponent;
  let fixture: ComponentFixture<InventoryInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryInsumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
