import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrintSettingsComponent } from './list-print-settings.component';

describe('ListPrintSettingsComponent', () => {
  let component: ListPrintSettingsComponent;
  let fixture: ComponentFixture<ListPrintSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrintSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPrintSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
