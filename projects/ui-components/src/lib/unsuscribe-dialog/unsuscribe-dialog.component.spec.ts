import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeDialogComponent } from './unsuscribe-dialog.component';

describe('UnsuscribeDialogComponent', () => {
  let component: UnsuscribeDialogComponent;
  let fixture: ComponentFixture<UnsuscribeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuscribeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsuscribeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
