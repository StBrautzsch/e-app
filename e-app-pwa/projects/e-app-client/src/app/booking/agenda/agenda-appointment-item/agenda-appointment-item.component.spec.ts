import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgendaAppointmentItemComponent} from './agenda-appointment-item.component';

describe('AgendaAppointmentItemComponent', () => {
  let component: AgendaAppointmentItemComponent;
  let fixture: ComponentFixture<AgendaAppointmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaAppointmentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaAppointmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
