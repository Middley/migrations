import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConceptComponent } from './register-concept.component';

describe('RegisterConceptComponent', () => {
  let component: RegisterConceptComponent;
  let fixture: ComponentFixture<RegisterConceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterConceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
