import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishPresaleComponent } from './finish-presale.component';

describe('FinishPresaleComponent', () => {
  let component: FinishPresaleComponent;
  let fixture: ComponentFixture<FinishPresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishPresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishPresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
