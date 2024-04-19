import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPrivateComponent } from './sidebar-private.component';

describe('SidebarPrivateComponent', () => {
  let component: SidebarPrivateComponent;
  let fixture: ComponentFixture<SidebarPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPrivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
