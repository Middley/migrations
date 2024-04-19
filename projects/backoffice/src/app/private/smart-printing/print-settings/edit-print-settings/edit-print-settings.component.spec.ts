import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrintSettingsComponent } from './edit-print-settings.component';

describe('EditPrintSettingsComponent', () => {
  let component: EditPrintSettingsComponent;
  let fixture: ComponentFixture<EditPrintSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPrintSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrintSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
