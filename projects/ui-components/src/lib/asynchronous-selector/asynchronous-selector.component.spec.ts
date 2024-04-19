import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsynchronousSelectorComponent } from './asynchronous-selector.component';

describe('AsynchronousSelectorComponent', () => {
  let component: AsynchronousSelectorComponent;
  let fixture: ComponentFixture<AsynchronousSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsynchronousSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsynchronousSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
