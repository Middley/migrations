import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPrintSettingsComponent } from './show-print-settings.component';

describe('ShowPrintSettingsComponent', () => {
  let component: ShowPrintSettingsComponent;
  let fixture: ComponentFixture<ShowPrintSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPrintSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPrintSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
