import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipayRegisterComponent } from './multipay-register.component';

describe('MultipayRegisterComponent', () => {
  let component: MultipayRegisterComponent;
  let fixture: ComponentFixture<MultipayRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipayRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipayRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
