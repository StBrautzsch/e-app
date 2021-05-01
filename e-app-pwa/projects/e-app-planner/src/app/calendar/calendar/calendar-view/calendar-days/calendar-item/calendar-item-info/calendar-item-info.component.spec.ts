import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarItemInfoComponent} from './calendar-item-info.component';

describe('CalendarItemInfoComponent', () => {
  let component: CalendarItemInfoComponent;
  let fixture: ComponentFixture<CalendarItemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarItemInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
