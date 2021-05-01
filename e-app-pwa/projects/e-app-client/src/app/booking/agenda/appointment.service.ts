import {Injectable} from '@angular/core';
import {ApiService} from '../../../../../libs/src/lib/api/api-service/api.service';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {Observable, Observer} from 'rxjs';
import {ApiClientService} from '../../../../../libs/src/lib/api/api-service/api-client.service';
import {AgendaService} from '../../../../../libs/src/lib/e-app/agenda/agenda.service';
import {AgendaItemAppointment} from '../../../../../libs/src/lib/e-app/agenda/agenda-item';
import {Appointment} from '../../../../../libs/src/lib/data/slot';
import {AppointmentDetailsDialogResult} from '../appointment-details-dialog/appointment-details-dialog.component';
import {observerNextAndComplete} from '../../../../../libs/src/lib/tools';
import {BookingDialogService} from '../booking-dialog.service';
import {EXCEPTION_REF_NOT_FOUND} from '../../../../../libs/src/lib/msg';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends AgendaService implements AgendaService {

  appointments: Appointment[] = [];
  agenda: AgendaItemAppointment[] = [];

  readonly clientApi: ApiClientService;

  constructor(private app: BaseAppService, private api: ApiService, private bookingDialog: BookingDialogService) {
    super();
    console.log('AppointmentService');
    this.clientApi = api.castClient();
    this.app.toolbarRefresh.subscribe(() => this.updateAppointmentsAndAgenda());
  }

  private errorRefresh(): void {
    this.updateAppointmentsAndAgenda();
    this.app.dialog.defaultErrorDialog('', '');
  }

  getAppointmentById(id: number): Appointment {
    for (const a of this.appointments) {
      if (a.id === id) {
        return a;
      }
    }
    return null;
  }

  getIndexForAppointmentById(id: number): number {
    for (let i = 0; i < this.appointments.length; i++) {
      if (this.appointments[i].id === id) {
        return i;
      }
    }
    return null;
  }

  showAppointmentDetailsDialogById(id: number): void {
    const a = this.getAppointmentById(id);
    if (!!a) {
      return this.showAppointmentDetailsDialog(a);
    }
    this.app.dialog.defaultErrorDialog(EXCEPTION_REF_NOT_FOUND, '');
  }

  showAppointmentDetailsDialog(appointment: Appointment): void {
    this.bookingDialog.showAppointmentDetailsDialog(appointment)
      .subscribe((data) => {
        if (data === AppointmentDetailsDialogResult.DELETE) {
          this.deleteAppointmentWithAlert(appointment);
        }
      });
  }

  deleteAppointmentWithAlert(appointment: Appointment): void {
    this.bookingDialog.showAppointmentDeleteAlert(appointment)
      .subscribe((ret) => {
        if (ret) {
          this.deleteAppointment(appointment);
        }
      });
  }

  private deleteAppointment(appointment: Appointment): void {
    appointment.changing = true;
    this.clientApi.appointmentDelete(appointment.id).subscribe(
      () => this.deleteAppointmentSuccessful(appointment),
      () => this.errorRefresh());
  }

  private deleteAppointmentSuccessful(appointment: Appointment): void {
    this.bookingDialog.deleteAppointmentSuccessfulSnackbar(appointment);
    this.removeAppointmentFromAgendaAndUpdate(appointment);
  }

  private removeAppointmentFromAgendaAndUpdate(appointment: Appointment): void {
    this.appointments.splice(this.getIndexForAppointmentById(appointment.id), 1);
    this.updateAgenda();
  }

  updateAppointmentsAndAgenda(): boolean {
    if (!this._updating) {
      this.updateAppointmentsAndAgendaAndWait().subscribe();
      return true;
    }
    return false;
  }

  updateAppointmentsAndAgendaAndWait(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      if (!this._updating) {
        this._updating = true;
        this.clientApi.appointmentGet()
          .subscribe((data) => this.receiveAppointments(data, observer));
      } else {
        observerNextAndComplete(observer, false);
      }
    });
  }

  private receiveAppointments(data: Appointment[], observer: Observer<boolean>): void {
    this._lastUpdate = new Date();
    this.appointments = data;
    console.log('updateAppointments', data.length);
    this.updateAgenda();
    this._updating = false;
    observerNextAndComplete(observer, true);
  }

  private updateAgenda(): void {
    const now = new Date();
    const data = {lastDay: new Date(0), lastM: -1};
    this.agenda = [];
    for (const a of this.appointments) {
      if (a.start.getTime() > now.getTime()) {
        this.addSlotToAgenda(a, data);
      }
    }
  }

  protected addSlotToAgenda(a: Appointment, data: { lastDay: Date, lastM: number }): void {
    super.addSlotToAgenda(a, data);
    this.agenda.push(new AgendaItemAppointment(a, null, false));
  }

}
