import {Observable, Observer} from 'rxjs';
import {ApiService} from '../../api/api-service/api.service';
import {User, UserRaw} from '../../data/user';
import {BaseAppService} from '../../base-app/base-app.service';
import {HttpResult} from '../../api/api-service/abstract-api-basics';
import {observerNextAndComplete} from '../../tools';

export enum LoginState {SUCCESSFUL, FORBIDDEN, ERROR}

export abstract class AbstractAccountLogin {

  abstract user: User;

  protected constructor(protected api: ApiService, protected app: BaseAppService) {
    api.logoutEvent.subscribe(() => this.logout());
  }

  login(): Observable<LoginState> {
    const login = this.api.login();
    return new Observable((observer: Observer<LoginState>) => {
      login.subscribe(
        (result: UserRaw) => this.loginWork(result, observer),
        (err: HttpResult) => this.loginError(err, observer)
      );
    });
  }

  private loginWork(result: UserRaw, observer: Observer<LoginState>): void {
    this.saveAccountData(result);
    return observerNextAndComplete(observer, LoginState.SUCCESSFUL);
  }

  private loginError(err: HttpResult, observer: Observer<LoginState>): void {
    this.clearAccountData();
    if (err === HttpResult.FORBIDDEN) {
      return observerNextAndComplete(observer, LoginState.FORBIDDEN);
    }
    observerNextAndComplete(observer, LoginState.ERROR);
  }

  authenticateAndLoginToken(tokenStr: string): Observable<LoginState> {
    this.api.saveToken({token: tokenStr, expiration: null});
    return this.authenticateAndLogin(this.api.authenticateToken());
  }

  authenticateAndLoginUserPw(user: string, pw: string): Observable<LoginState> {
    return this.authenticateAndLogin(this.api.authenticateUserPw(user, pw));
  }

  private authenticateAndLogin(auth: Observable<HttpResult>): Observable<LoginState> {
    return new Observable((observer: Observer<LoginState>) => {
      auth.subscribe((result: HttpResult) => this.authenticateWork(result, observer));
    });
  }

  private authenticateWork(result: HttpResult | HttpResult.FORBIDDEN | HttpResult.ERROR, observer: Observer<LoginState>): void {
    if (result === HttpResult.SUCCESSFUL) {
      return this.authenticateWorkSuccessful(observer);
    }
    this.authenticateWorkError(result, observer);
  }

  private authenticateWorkSuccessful(observer: Observer<LoginState>): void {
    this.login().subscribe((ret: LoginState) => observerNextAndComplete(observer, ret));
  }

  private authenticateWorkError(result: HttpResult.FORBIDDEN | HttpResult.ERROR, observer: Observer<LoginState>): void {
    this.api.clearToken();
    if (result === HttpResult.FORBIDDEN) {
      return observerNextAndComplete(observer, LoginState.FORBIDDEN);
    }
    observerNextAndComplete(observer, LoginState.ERROR);
  }

  logout(): void {
    this.clearAccountData();
    this.app.newLoginRequired(true, false);
  }

  protected clearAccountData(): void {
    this.user = undefined;
    this.app.user = null;
    this.api.clearToken();
  }

  protected saveAccountData(user: UserRaw): void {
    const data = JSON.stringify(user);
    this.parseSessionData(data);
    this.app.user = this.user;
  }

  protected abstract parseSessionData(data: string): void;

  isAuth(): boolean {
    if (this.user !== null && this.user !== undefined && this.api.isAuth()) {
      return true;
    }
    return false;
  }

  isValidTokenExisting(): boolean {
    if (this.api.isAuth() && !this.api.isTokenExpired()) {
      return true;
    }
    return false;
  }

}
