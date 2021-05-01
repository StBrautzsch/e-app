import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppointmentDeleteAlertComponent} from './appointment-delete-alert.component';

describe('AppointmentDeleteAlertComponent', () => {
  let component: AppointmentDeleteAlertComponent;
  let fixture: ComponentFixture<AppointmentDeleteAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDeleteAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDeleteAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
