import {Injectable} from '@angular/core';
import {BaseAppService} from '../../base-app/base-app.service';
import {AccountService} from '../../account/account-service/account-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {LoginState} from '../../account/account-service/abstract-account-login';
import {AccountRaw} from '../../data/account';
import {ApiService} from '../../api/api-service/api.service';
import {MatDialog} from '@angular/material/dialog';
import {PasswortInputDialogComponent} from './passwort-input-dialog/passwort-input-dialog.component';
import {PasswordResetDialogComponent} from './password-reset-dialog/password-reset-dialog.component';
import {REPLACE_STRING, SB_MSG} from '../../msg';

export enum VerificationType {NONE, MAIL, ACCOUNT, PASSWORD}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private app: BaseAppService, private account: AccountService, private api: ApiService,
              private router: Router, private route: ActivatedRoute, private location: Location, private dialog: MatDialog) {
    console.log('LoginService');
  }

  showPasswordResetDialog(): void {
    this.dialog.open(PasswordResetDialogComponent).afterClosed()
      .subscribe((mail: string) => this.afterClosedPasswordResetDialog(mail));
  }

  private afterClosedPasswordResetDialog(mail: string): void {
    if (mail) {
      const request = this.api.passwordForgotten(mail);
      this.verificationRequest(request, SB_MSG.SENDING_MAIL.replace(REPLACE_STRING, mail), mail);
    }
  }

  createAccount(account: AccountRaw): void {
    this.api.castClient().accountPost(account).subscribe(
      () => this.app.dialog.showSnackBar(SB_MSG.SENDING_MAIL.replace(REPLACE_STRING, account.mail)),
      (error: string) => this.app.dialog.defaultErrorDialog(error, account.mail));
  }

  verification(): void {
    const id = this.route.snapshot.queryParams.id;
    const code = this.route.snapshot.queryParams.code;
    const type = Number(this.route.snapshot.queryParams.type);
    if (id && code && type) {
      if (type === VerificationType.MAIL) {
        this.verificationMail(Number(id), code);
      }
      if (type === VerificationType.ACCOUNT) {
        this.verificationAccount(Number(id), code);
      }
      if (type === VerificationType.PASSWORD) {
        this.resetPassword(Number(id), code);
      }
    }
  }

  private verificationMail(id: number, code: string): void {
    this.location.go(this.location.path().split('?')[0]);
    this.app.spinner.show();
    const request = this.api.verificationMail(id, code);
    this.verificationRequest(request, SB_MSG.MAIL_VERIFICATION);
  }

  private resetPassword(id: number, code: string): void {
    this.location.go(this.location.path().split('?')[0]);
    this.dialog.open(PasswortInputDialogComponent).afterClosed()
      .subscribe((password: string) => this.afterClosedPasswortInputDialogReset(password, id, code));
  }

  private afterClosedPasswortInputDialogReset(password: string, id: number, code: string): void {
    if (password) {
      const request = this.api.resetPassword(code, id, password);
      this.verificationRequest(request, SB_MSG.PASSWORD_RESET);
    }
  }

  private verificationAccount(id: number, code: string): void {
    this.location.go(this.location.path().split('?')[0]);
    this.dialog.open(PasswortInputDialogComponent).afterClosed()
      .subscribe((password: string) => this.afterClosedPasswortInputDialogVerification(password, id, code));
  }

  private afterClosedPasswortInputDialogVerification(password: string, id: number, code: string): void {
    if (password) {
      const request = this.api.verificationAccount(id, code, password);
      this.verificationRequest(request, SB_MSG.ACCOUNT_VERIFICATION);
    }
  }

  private verificationRequest(request: Observable<boolean>, msg: string, mail = ''): void {
    request.subscribe(
      () => this.verificationSuccessful(msg),
      (error: string) => this.verificationError(error, mail));
  }

  private verificationError(error: string, mail: string): void {
    this.app.dialog.defaultErrorDialog(error, mail);
    this.app.spinner.hide();
  }

  private verificationSuccessful(msg: string): void {
    this.app.dialog.showSnackBar(msg);
    this.app.spinner.hide();
  }

  logout(): void {
    if (this.account.isAuth()) {
      this.account.logout();
    }
  }

  moodleLtiLogin(): void {
    const token = this.route.snapshot.queryParams.token;
    if (token && token !== '') {
      this.location.go(this.location.path().split('?')[0]);
      this.app.spinner.show();
      this.account.authenticateAndLoginToken(token)
        .subscribe((ret: LoginState) => this.receiveMoodleAuth(ret));
    }
  }

  private receiveMoodleAuth(ret: LoginState): void {
    this.app.spinner.hide();
    if (ret === LoginState.SUCCESSFUL) {
      this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/');
      this.app.dialog.showSnackBar(SB_MSG.AUTH_MOODLE);
    } else {
      this.router.navigate([this.app.routes.login], {queryParams: {moodleLtiErr: 1}});
    }
  }

}
