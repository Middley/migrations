import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPresaleComponent } from './register-presale.component';

describe('RegisterPresaleComponent', () => {
  let component: RegisterPresaleComponent;
  let fixture: ComponentFixture<RegisterPresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
