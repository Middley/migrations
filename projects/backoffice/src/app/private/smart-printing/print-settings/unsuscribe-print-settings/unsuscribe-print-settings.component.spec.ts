import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribePrintSettingsComponent } from './unsuscribe-print-settings.component';

describe('UnsuscribePrintSettingsComponent', () => {
  let component: UnsuscribePrintSettingsComponent;
  let fixture: ComponentFixture<UnsuscribePrintSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribePrintSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsuscribePrintSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
