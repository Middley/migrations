import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPrintSettingsComponent } from './register-print-settings.component';

describe('RegisterPrintSettingsComponent', () => {
  let component: RegisterPrintSettingsComponent;
  let fixture: ComponentFixture<RegisterPrintSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPrintSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPrintSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
