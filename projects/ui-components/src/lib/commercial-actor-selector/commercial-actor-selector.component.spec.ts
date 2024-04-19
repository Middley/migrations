import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialActorSelectorComponent } from './commercial-actor-selector.component';

describe('CommercialActorSelectorComponent', () => {
  let component: CommercialActorSelectorComponent;
  let fixture: ComponentFixture<CommercialActorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialActorSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialActorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
