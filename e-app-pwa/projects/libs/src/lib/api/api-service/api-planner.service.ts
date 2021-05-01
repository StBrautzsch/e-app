import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../e-app-planner/src/environments/environment';
import {Observable, Observer} from 'rxjs';
import {Slot, SlotCreateRaw, SlotMoveRaw, SlotRaw} from '../../data/slot';
import {BaseAppService} from '../../base-app/base-app.service';
import {map} from 'rxjs/operators';
import {PlannerSettingsRaw} from '../../data/user-settings';
import {observerNextAndComplete} from '../../tools';
import {ReferenceRaw} from '../../data/reference';
import {Account, AccountRaw, AccountTransactionRaw} from '../../data/account';

@Injectable({
  providedIn: 'root'
})
export class ApiPlannerService extends ApiService implements ApiService {

  readonly URL_LOGIN = 'planner/';
  readonly STORAGE_PREFIX = 'p_';
  readonly URL_SLOT = 'planner/slot/';
  readonly URL_SETTINGS = 'planner/settings/';
  readonly URL_ACCOUNT = 'admin/account/';

  readonly API_URL_PREFIX = environment.apiUrl;
  readonly API_HOST = environment.apiHost;

  readonly PARAM_START = 'start';
  readonly PARAM_STOP = 'stop';
  readonly PARAM_NOTIFY = 'notify';

  constructor(protected http: HttpClient, protected app: BaseAppService) {
    super(http, app);
    console.log('ApiPlannerService');
    this.restoreSession();
  }

  castPlanner(): ApiPlannerService {
    return this;
  }

  castClient(): any {
    return null;
  }

  accountGet(): Observable<Account[]> {
    const http = this.http.get<AccountRaw[]>(this.createUrl(this.URL_ACCOUNT), this.createHttpOptions())
      .pipe(map(resultList => resultList.map(r => new Account(r))));
    return new Observable((observer: Observer<Account[]>) => {
      http.subscribe(
        (data) => observerNextAndComplete(observer, data),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  accountPut(account: AccountRaw): Observable<boolean> {
    const http = this.http.put(this.createUrl(this.URL_ACCOUNT), account, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  accountDelete(id: number): Observable<boolean> {
    const http = this.http.delete(this.createUrl(this.URL_ACCOUNT) + id, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  accountPost(account: AccountRaw): Observable<boolean> {
    const http = this.http.post(this.createUrl(this.URL_ACCOUNT), account, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  accountPatch(data: AccountTransactionRaw): Observable<boolean> {
    const http = this.http.patch(this.createUrl(this.URL_ACCOUNT), data, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  slotGet(start: Date, stop: Date): Observable<Slot[]> {
    const http = this.createSlotGetHttp(start, stop);
    return new Observable((observer: Observer<Slot[]>) => {
      http.subscribe(
        (data) => observerNextAndComplete(observer, data),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  slotGetSilent(start: Date, stop: Date): Observable<Slot[]> {
    const http = this.createSlotGetHttp(start, stop);
    return new Observable((observer: Observer<Slot[]>) => {
      http.subscribe((data) => observerNextAndComplete(observer, data));
    });
  }

  private createSlotGetHttp(start: Date, stop: Date): Observable<Slot[]> {
    const params = new HttpParams()
      .append(this.PARAM_START, start.getTime().toString())
      .append(this.PARAM_STOP, stop.getTime().toString());
    return this.http.get<SlotRaw[]>(this.createUrl(this.URL_SLOT), this.createHttpOptionsWithParams(params))
      .pipe(map(resultList => resultList.map(r => new Slot(r))));
  }

  slotMove(slot: SlotMoveRaw): Observable<boolean> {
    const http = this.http.put(this.createUrl(this.URL_SLOT), slot, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  slotCreate(slots: SlotCreateRaw[]): Observable<Slot[]> {
    const http = this.http.post<SlotRaw[]>(this.createUrl(this.URL_SLOT), slots, this.createHttpOptions())
      .pipe(map(resultList => resultList.map(r => new Slot(r))));
    return new Observable((observer: Observer<Slot[]>) => {
      http.subscribe(
        (data) => observerNextAndComplete(observer, data),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  slotDelete(id: number, notify: boolean): Observable<boolean> {
    const params = new HttpParams().append(this.PARAM_NOTIFY, String(notify));
    const http = this.http.delete(this.createUrl(this.URL_SLOT + id), this.createHttpOptionsWithParams(params));
    return this.defaultHttpSubscribe(http);
  }

  slotICalPut(id: number): Observable<string> {
    const http = this.http.put<ReferenceRaw>(this.createUrl(this.URL_SLOT + id), {}, this.createHttpOptions());
    return this.iCalPut(http);
  }

  settingsSave(settings: PlannerSettingsRaw): Observable<boolean> {
    const http = this.http.put(this.createUrl(this.URL_SETTINGS), settings, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

}
