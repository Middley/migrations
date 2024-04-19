import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationViwerComponent } from './operation-viwer.component';

describe('OperationViwerComponent', () => {
  let component: OperationViwerComponent;
  let fixture: ComponentFixture<OperationViwerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationViwerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
