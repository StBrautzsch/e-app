import {AbstractApiBasics, HttpResult} from './abstract-api-basics';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BaseAppService} from '../../base-app/base-app.service';
import {Token, TokenRaw} from '../../data/token';
import {Observable, Observer} from 'rxjs';
import {User, UserRaw} from '../../data/user';
import {observerNextAndComplete} from '../../tools';
import {VerificationRaw} from '../../data/verification';

export abstract class AbstractApiLogin extends AbstractApiBasics implements AbstractApiBasics {

  abstract readonly STORAGE_PREFIX: string;

  readonly STORAGE_TOKEN = 'token';

  readonly URL_AUTH = 'auth';
  readonly URL_AUTH_RENEW = this.URL_AUTH + '/renew';
  readonly URL_AUTH_ACCOUNT_VERIFICATION = this.URL_AUTH + '/verify-account';
  readonly URL_AUTH_MAIL_VERIFICATION = this.URL_AUTH + '/verify-mail';
  readonly URL_AUTH_ACCOUNT = this.URL_AUTH + '/account';

  protected token: Token;

  protected constructor(protected http: HttpClient, protected app: BaseAppService) {
    super(http, app);
  }

  passwordForgotten(mail: string): Observable<boolean> {
    const http = this.http.put(this.createUrl(this.URL_AUTH_ACCOUNT), {mail});
    return this.passwordSubscribe(http);
  }

  resetPassword(verifikationCode: string, id: number, password: string): Observable<boolean> {
    const data: VerificationRaw = {userId: id, verifikationCode, password};
    const http = this.http.patch(this.createUrl(this.URL_AUTH_ACCOUNT), data);
    return this.passwordSubscribe(http);
  }

  private passwordSubscribe(http: Observable<any>): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      http.subscribe(
        () => observerNextAndComplete(observer, true),
        (error: HttpErrorResponse) => observer.error(error.error));
    });
  }

  verificationMail(userId: number, verifikationCode: string): Observable<boolean> {
    return this.verification(userId, verifikationCode, null, this.URL_AUTH_MAIL_VERIFICATION);
  }

  verificationAccount(userId: number, verifikationCode: string, password: string): Observable<boolean> {
    return this.verification(userId, verifikationCode, password, this.URL_AUTH_ACCOUNT_VERIFICATION);
  }

  private verification(userId: number, verifikationCode: string, password: string, url: string): Observable<boolean> {
    const data: VerificationRaw = {userId, verifikationCode, password};
    const http = this.http.post(this.createUrl(url), data);
    return new Observable((observer: Observer<boolean>) => {
      http.subscribe(
        () => observerNextAndComplete(observer, true),
        (error: HttpErrorResponse) => observer.error(error.error));
    });
  }

  authenticateToken(): Observable<HttpResult> {
    const httpAuthenticate = this.http.post<TokenRaw>(this.createUrl(this.URL_AUTH_RENEW), {}, this.createHttpOptions());
    return this.authenticate(httpAuthenticate);
  }

  authenticateUserPw(username: string, password: string): Observable<HttpResult> {
    const httpAuthenticate = this.http.post<TokenRaw>(this.createUrl(this.URL_AUTH), {username, password});
    return this.authenticate(httpAuthenticate);
  }

  private authenticate(httpAuthenticate: Observable<TokenRaw>): Observable<HttpResult> {
    return new Observable((observer: Observer<HttpResult>) => {
      httpAuthenticate.subscribe(
        (data: TokenRaw) => this.authenticationSuccessful(new Token(data), observer),
        (error: HttpErrorResponse) => this.authenticationError(error, observer));
    });
  }

  private authenticationSuccessful(data: Token, observer: Observer<HttpResult>): void {
    this.saveToken(data);
    observerNextAndComplete(observer, HttpResult.SUCCESSFUL);
  }

  private authenticationError(error: HttpErrorResponse, observer: Observer<HttpResult>): void {
    if (this.isHttpForbiddenError(error)) {
      return observerNextAndComplete(observer, HttpResult.FORBIDDEN);
    }
    observerNextAndComplete(observer, HttpResult.ERROR);
  }

  login(): Observable<UserRaw> {
    const http = this.http.get<UserRaw>(this.createUrl(this.URL_LOGIN), this.createHttpOptions());
    return new Observable((observer: Observer<UserRaw>) => {
      http.subscribe(
        (data: UserRaw) => observerNextAndComplete(observer, data),
        (error: HttpErrorResponse) => this.loginError(error, observer));
    });
  }

  private loginError(error: HttpErrorResponse, observer: Observer<User>): void {
    if (this.isHttpForbiddenError(error)) {
      return observer.error(HttpResult.FORBIDDEN);
    }
    observer.error(HttpResult.ERROR);
  }

  clearToken(): void {
    this.token = undefined;
    localStorage.removeItem(this.STORAGE_PREFIX + this.STORAGE_TOKEN);
  }

  saveToken(token: Token): void {
    localStorage.setItem(this.STORAGE_PREFIX + this.STORAGE_TOKEN, JSON.stringify(token));
    this.token = token;
  }

  restoreSession(): void {
    const token = localStorage.getItem(this.STORAGE_PREFIX + this.STORAGE_TOKEN);
    if (token !== null) {
      console.log('Restore Token from Session');
      const tokenResponse: TokenRaw = JSON.parse(token);
      this.token = new Token(tokenResponse);
    }
  }

  isAuth(): boolean {
    return !((this.token === null) || (this.token === undefined));
  }

  getTokenExpiration(): Date {
    return this.token.expiration;
  }

  calcTokenExpiration(): number {
    return (this.token.expiration.getTime() - Date.now());
  }

  isTokenExpired(): boolean {
    return this.calcTokenExpiration() < 1000;
  }

}
