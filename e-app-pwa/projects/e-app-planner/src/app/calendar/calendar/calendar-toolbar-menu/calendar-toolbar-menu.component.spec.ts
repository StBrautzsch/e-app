import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarToolbarMenuComponent} from './calendar-toolbar-menu.component';

describe('CalendarMoreMenuComponent', () => {
  let component: CalendarToolbarMenuComponent;
  let fixture: ComponentFixture<CalendarToolbarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarToolbarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarToolbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
