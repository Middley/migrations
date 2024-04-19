import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeInsumoComponent } from './unsuscribe-insumo.component';

describe('UnsuscribeInsumoComponent', () => {
  let component: UnsuscribeInsumoComponent;
  let fixture: ComponentFixture<UnsuscribeInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeInsumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsuscribeInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
