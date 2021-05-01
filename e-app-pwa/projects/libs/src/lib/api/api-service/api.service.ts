import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {ApiClientService} from './api-client.service';
import {ApiPlannerService} from './api-planner.service';
import {UserDataRaw, UserPwRaw} from '../../data/user';
import {BaseAppService} from '../../base-app/base-app.service';
import {AbstractApiLogin} from './abstract-api-login';
import {observerNextAndComplete} from '../../tools';
import {ReferenceRaw} from '../../data/reference';

export abstract class ApiService extends AbstractApiLogin implements AbstractApiLogin {

  readonly URL_PING = 'ping';
  readonly URL_ICAL = 'ical/';
  readonly URL_USER = 'user';
  readonly URL_USER_DATA = this.URL_USER + '/data';
  readonly URL_USER_PW = this.URL_USER + '/pw';
  readonly URL_USER_MAIL = this.URL_USER + '/mail';

  protected constructor(protected http: HttpClient, protected app: BaseAppService) {
    super(http, app);
  }

  abstract castPlanner(): ApiPlannerService;

  abstract castClient(): ApiClientService;

  ping(): Observable<string> {
    const http = this.http.get(this.createUrl(this.URL_PING), {responseType: 'text'});
    return new Observable((observer: Observer<string>) => {
      http.subscribe(
        (ret: string) => observerNextAndComplete(observer, ret),
        (error: HttpErrorResponse) => observerNextAndComplete(observer, error.message));
    });
  }

  protected iCalPut(http: Observable<ReferenceRaw>): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      http.subscribe(
        (data) => observerNextAndComplete(observer, data.reference),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  userDataSave(data: UserDataRaw): Observable<boolean> {
    console.log(data);
    const http = this.http.put(this.createUrl(this.URL_USER_DATA), data, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  userPwSave(data: UserPwRaw): Observable<boolean> {
    const http = this.http.put<boolean>(this.createUrl(this.URL_USER_PW), data, this.createHttpOptions());
    return new Observable((observer: Observer<boolean>) => {
      http.subscribe(
        (ret) => observerNextAndComplete(observer, ret),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  userMailChangeSave(mail: string): Observable<boolean> {
    const http = this.http.put(this.createUrl(this.URL_USER_MAIL), {mail}, this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  userMailChangeCancel(): Observable<boolean> {
    const http = this.http.delete(this.createUrl(this.URL_USER_MAIL), this.createHttpOptions());
    return this.defaultHttpSubscribe(http);
  }

  protected defaultHttpSubscribe(http: Observable<any>): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      http.subscribe(
        () => observerNextAndComplete(observer, true),
        (error: HttpErrorResponse) => this.hardErrorWithLogoutIfFatal(error, observer, error));
    });
  }

  protected hardErrorWithLogoutIfFatal(error: HttpErrorResponse, observer: Observer<any>, errorData: any): boolean {
    if (this.isHttpForbiddenError(error) || this.isHttpResponseError(error)) {
      this.hardErrorWithLogout(error);
      return true;
    }
    this.sendErrorData(errorData, error, observer);
    return false;
  }

  private sendErrorData(errorData: any, error: HttpErrorResponse, observer: Observer<any>): void {
    if (errorData !== null) {
      if (error.error) {
        console.error(error.error);
        observer.error(errorData.error);
      } else {
        console.error(errorData);
        observer.error(errorData);
      }
    }
  }
}
