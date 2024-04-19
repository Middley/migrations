import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPresaleComponent } from './confirm-presale.component';

describe('ConfirmPresaleComponent', () => {
  let component: ConfirmPresaleComponent;
  let fixture: ComponentFixture<ConfirmPresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
