import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../../e-app-client/src/environments/environment';
import {BaseAppService} from '../../base-app/base-app.service';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {Appointment, AppointmentRaw} from '../../data/slot';
import {PlannerPerson, PlannerPersonRaw} from '../../data/planner-person';
import {BookingAnonymRaw, BookingRaw, BookingSlot, BookingSlotRaw} from '../../data/booking-slot';
import {ClientSettingsRaw} from '../../data/user-settings';
import {observerNextAndComplete} from '../../tools';
import {ReferenceRaw} from '../../data/reference';
import {AccountRaw} from '../../data/account';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService extends ApiService implements ApiService {

  readonly URL_LOGIN = 'client';
  readonly STORAGE_PREFIX = 'c_';
  readonly URL_APPOINTMENT = 'client/appointment/';
  readonly URL_BOOKING = 'booking/';
  readonly URL_BOOKING_APPOINTMENT = 'booking/appointment/';
  readonly URL_SETTINGS = 'client/settings/';

  readonly API_URL_PREFIX = environment.apiUrl;
  readonly API_HOST = environment.apiHost;

  constructor(protected http: HttpClient, protected app: BaseAppService) {
    super(http, app);
    console.log('ApiClientService');
    this.restoreSession();
  }

  castPlanner(): any {
    return null;
  }

  castClient(): ApiClientService {
    return this;
  }

  accountPost(account: AccountRaw): Observable<boolean> {
    const http = this.http.post(this.createUrl(this.URL_AUTH_ACCOUNT), account);
    return this.defaultHttpSubscribe(http);
  }

  appointmentGet(): Observable<Appointment[]> {
    const http = this.http.get<AppointmentRaw[]>(this.createUrl(this.URL_APPOINTMENT), this.createHttpOptions())
      .pipe(map(resultList => resultList.map(r => new Appointment(r))));
    return new Observable((observer: Observer<Appointment[]>) => {
      http.subscribe(
        (data) => observerNextAndComplete(observer, data),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  appointmentAnonymGet(reference: string): Observable<Appointment> {
    const http = this.http.get<AppointmentRaw>(this.createUrl(this.URL_BOOKING_APPOINTMENT + reference));
    return new Observable((observer: Observer<Appointment>) => {
      http.subscribe(
        (data) => observerNextAndComplete(observer, new Appointment(data)),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  appointmentDelete(id: number): Observable<boolean> {
    const http = this.http.delete(this.createUrl(this.URL_APPOINTMENT + id), this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  appointmentICalPut(id: number): Observable<string> {
    const http = this.http.put<ReferenceRaw>(this.createUrl(this.URL_APPOINTMENT + id), {}, this.createHttpOptions());
    return this.iCalPut(http);
  }

  appointmentAnonymICalPut(reference: string): Observable<string> {
    const http = this.http.put<ReferenceRaw>(this.createUrl(this.URL_BOOKING_APPOINTMENT + reference), {});
    return this.iCalPut(http);
  }

  appointmentAnonymDelete(reference: string): Observable<boolean> {
    const http = this.http.delete(this.createUrl(this.URL_BOOKING_APPOINTMENT + reference));
    return this.defaultHttpSubscribe(http);
  }

  bookingGetPersons(): Observable<PlannerPerson[]> {
    const http = this.http.get<PlannerPersonRaw[]>(this.createUrl(this.URL_BOOKING))
      .pipe(map(resultList => resultList.map(r => new PlannerPerson(r))));
    return new Observable((observer: Observer<PlannerPerson[]>) => {
      http.subscribe(
        (data) => observerNextAndComplete(observer, data),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  bookingGetSlots(id: number): Observable<BookingSlot[]> {
    const http = this.http.get<BookingSlotRaw[]>(this.createUrl(this.URL_BOOKING + id))
      .pipe(map(resultList => resultList.map(r => new BookingSlot(r))));
    return new Observable((observer: Observer<BookingSlot[]>) => {
      http.subscribe(
        (data) => observerNextAndComplete(observer, data),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  bookingPostAnonym(booking: BookingAnonymRaw): Observable<boolean> {
    const http = this.http.post(this.createUrl(this.URL_BOOKING), booking);
    return this.defaultHttpSubscribe(http);
  }

  bookingPostAuth(booking: BookingRaw): Observable<boolean> {
    const http = this.http.post(this.createUrl(this.URL_APPOINTMENT), booking, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  settingsSave(settings: ClientSettingsRaw): Observable<boolean> {
    const http = this.http.put(this.createUrl(this.URL_SETTINGS), settings, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

}
