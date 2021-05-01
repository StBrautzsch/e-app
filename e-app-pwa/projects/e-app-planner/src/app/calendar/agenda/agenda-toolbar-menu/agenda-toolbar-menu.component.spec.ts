import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgendaToolbarMenuComponent} from './agenda-toolbar-menu.component';

describe('AgendaToolbarMenuComponent', () => {
  let component: AgendaToolbarMenuComponent;
  let fixture: ComponentFixture<AgendaToolbarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaToolbarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaToolbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
