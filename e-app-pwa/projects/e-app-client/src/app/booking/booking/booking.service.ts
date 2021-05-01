import {Injectable} from '@angular/core';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {ApiService} from '../../../../../libs/src/lib/api/api-service/api.service';
import {PlannerPerson} from '../../../../../libs/src/lib/data/planner-person';
import {ApiClientService} from '../../../../../libs/src/lib/api/api-service/api-client.service';
import {Observable, Observer} from 'rxjs';
import {BookingAnonymRaw, BookingRaw, BookingSlot} from '../../../../../libs/src/lib/data/booking-slot';
import {AbstractBookingSlotFilter} from './abstract-booking-slot-filter';
import {Appointment} from '../../../../../libs/src/lib/data/slot';
import {AppointmentDetailsDialogResult} from '../appointment-details-dialog/appointment-details-dialog.component';
import {observerNextAndComplete} from '../../../../../libs/src/lib/tools';
import {BookingDialogService} from '../booking-dialog.service';
import {REPLACE_STRING, REPLACE_STRING_DATE, REPLACE_STRING_TIME, SB_MSG} from '../../../../../libs/src/lib/msg';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends AbstractBookingSlotFilter {

  plannerPersons: PlannerPerson[] = [];

  readonly clientApi: ApiClientService;

  selectedPlannerPerson: PlannerPerson;
  selectedSlot: BookingSlot;
  inputDataName: string;
  inputDataMail: string;
  inputDataTel: string;
  submitComment: string;

  personFilter: string;

  constructor(private app: BaseAppService, private api: ApiService, private bookingDialog: BookingDialogService) {
    super();
    this.clientApi = api.castClient();
    this.clearBookingData();
    this.resetPersonFilter();
  }

  clearBookingData(): void {
    this.selectedPlannerPerson = null;
    this.selectedSlot = null;
    this.inputDataName = '';
    this.inputDataMail = '';
    this.inputDataTel = '';
    this.submitComment = '';
    this.resetPersonFilter();
  }

  resetPersonFilter(): void {
    this.personFilter = '';
  }

  updatePlannerPersons(): Observable<number> {
    return new Observable((observer: Observer<number>) => {
      this.clientApi.bookingGetPersons()
        .subscribe(data => this.receivePlannerPersons(data, observer));
    });
  }

  private receivePlannerPersons(data: PlannerPerson[], observer: Observer<number>): void {
    this.plannerPersons = data;
    console.log('updatePlannerPersons', data.length);
    observerNextAndComplete(observer, data.length);
  }

  getFilteredPlannerPersons(): PlannerPerson[] {
    const filter = this.personFilter.toLowerCase();
    const data: PlannerPerson[] = [];
    for (const p of this.plannerPersons) {
      this.filterPlannerPerson(p, filter, data);
    }
    return data;
  }

  private filterPlannerPerson(p: PlannerPerson, filter: string, data: PlannerPerson[]): void {
    const values = p.preName +  p.name + p.preName + p.mail + p.tel;
    if (values.toLowerCase().includes(filter.replace(' ', '').replace(',', ''))) {
      data.push(p);
    }
  }

  getPlannerPerson(id: number): PlannerPerson {
    for (const p of this.plannerPersons) {
      if (p.id === id) {
        return p;
      }
    }
    return null;
  }

  updateSlots(id: number): Observable<number> {
    return new Observable((observer: Observer<number>) => {
      this.clientApi.bookingGetSlots(id)
        .subscribe(data => this.receiveSlots(data, observer));
    });
  }

  private receiveSlots(data: BookingSlot[], observer: Observer<number>): void {
    this.slots = data;
    this.filterSlots();
    console.log('updateSlots', data.length);
    observerNextAndComplete(observer, data.length);
  }

  getSlot(id: number): BookingSlot {
    for (const s of this.slots) {
      if (s.id === id) {
        return s;
      }
    }
    return null;
  }

  private createBookingAuthData(): BookingRaw {
    return {
      duration: this.selectedSlot.duration,
      remark: this.submitComment,
      slotId: this.selectedSlot.id,
      start: this.selectedSlot.start,
      userId: this.selectedPlannerPerson.id
    };
  }

  private createBookingAnonymData(): BookingAnonymRaw {
    return {
      duration: this.selectedSlot.duration,
      mail: this.inputDataMail,
      name: this.inputDataName,
      remark: this.submitComment,
      slotId: this.selectedSlot.id,
      start: this.selectedSlot.start,
      tel: this.inputDataTel,
      userId: this.selectedPlannerPerson.id
    };
  }

  bookingAuth(): void {
    const bookingData = this.createBookingAuthData();
    const person = this.selectedPlannerPerson.mergeName();
    this.submitComment = '';
    this.clientApi.bookingPostAuth(bookingData).subscribe(
      () => this.bookingFinished(bookingData, person),
      (error: string) => this.bookingError(error));
  }

  bookingAnonym(): void {
    const bookingData = this.createBookingAnonymData();
    const person = this.selectedPlannerPerson.mergeName();
    this.submitComment = '';
    this.clientApi.bookingPostAnonym(bookingData).subscribe(
      () => this.bookingFinished(bookingData, person),
      (error: string) => this.bookingError(error));
  }

  findAppointmentAndShowDetailsDialog(reference: string): void {
    this.clientApi.appointmentAnonymGet(reference).subscribe(
      (appointment) => this.showAppointmentDetailsDialog(appointment, reference),
      (error: string) => this.app.dialog.defaultErrorDialog(error));
  }

  private showAppointmentDetailsDialog(appointment: Appointment, reference: string): void {
    this.bookingDialog.showAppointmentDetailsDialogWithRef(appointment, reference)
      .subscribe((data) => {
        if (data === AppointmentDetailsDialogResult.DELETE) {
          this.deleteAppointmentWithAlert(appointment, reference);
        }
      });
  }

  private deleteAppointmentWithAlert(appointment: Appointment, reference: string): void {
    this.bookingDialog.showAppointmentDeleteAlert(appointment)
      .subscribe((ret) => {
        if (ret) {
          this.deleteAppointment(reference, appointment);
        }
      });
  }

  private deleteAppointment(reference: string, appointment: Appointment): void {
    this.clientApi.appointmentAnonymDelete(reference).subscribe(
      () => this.bookingDialog.deleteAppointmentSuccessfulSnackbar(appointment),
      () => this.app.dialog.defaultErrorDialog());
  }

  private bookingFinished(booking: BookingRaw, person: string): void {
    const msg = SB_MSG.BOOKING
      .replace(REPLACE_STRING, person)
      .replace(REPLACE_STRING_DATE, this.app.datePipe.transform(booking.start, 'longDate'))
      .replace(REPLACE_STRING_TIME, this.app.datePipe.transform(booking.start, 'shortTime'));
    this.app.dialog.showSnackBar(msg);
  }

  private bookingError(error: string): void {
    this.app.dialog.defaultErrorDialog(error);
  }

}
