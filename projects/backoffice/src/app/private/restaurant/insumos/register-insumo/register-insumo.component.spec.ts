import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInsumoComponent } from './register-insumo.component';

describe('RegisterInsumoComponent', () => {
  let component: RegisterInsumoComponent;
  let fixture: ComponentFixture<RegisterInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInsumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
