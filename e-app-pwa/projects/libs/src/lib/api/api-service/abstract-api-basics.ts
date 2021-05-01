import {Token} from '../../data/token';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseAppService} from '../../base-app/base-app.service';
import {EventEmitter} from '@angular/core';

export enum HttpResult {SUCCESSFUL, FORBIDDEN, ERROR}

export abstract class AbstractApiBasics {

  abstract readonly URL_LOGIN: string;
  abstract readonly API_URL_PREFIX: string;
  abstract readonly API_HOST: string;

  protected abstract token: Token;

  logoutEvent = new EventEmitter<any>();

  abstract clearToken(): void;

  protected constructor(protected http: HttpClient, protected app: BaseAppService) {
  }

  protected hardErrorWithLogout(error: HttpErrorResponse): void {
    this.clearToken();
    this.logoutEvent.emit();
    this.app.dialog.defaultErrorDialog(error.name, '');
    this.app.newLoginRequired(true, false);
  }

  protected isHttpForbiddenError(error: HttpErrorResponse): boolean {
    return error.status === 401 || error.status === 403;
  }

  protected isHttpResponseError(error: HttpErrorResponse): boolean {
    return error.status === 0;
  }

  public createUrl(url: string): string {
    return this.API_HOST + this.API_URL_PREFIX + url;
  }

  protected createHttpOptions(): {} {
    return {
      headers: this.createHttpHeaders()
    };
  }

  protected createHttpOptionsWithParams(p: HttpParams): {} {
    return {
      headers: this.createHttpHeaders(),
      params: p
    };
  }

  private createHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token.token}`
    });
  }

}
