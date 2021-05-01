import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BaseAppService} from '../../../base-app/base-app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../account/account-service/account-service';
import {LoginState} from '../../../account/account-service/abstract-account-login';
import {LoginService} from '../login.service';

@Component({
  selector: 'lib-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss']
})
export class LoginInputComponent implements OnInit, DoCheck {

  tLoginState = LoginState;

  @ViewChild(NgForm) form: NgForm;

  hide = true;
  error = LoginState.SUCCESSFUL;
  moodleLtiErr = false;

  constructor(public app: BaseAppService, public account: AccountService, public login: LoginService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadMoodleError();
  }

  ngDoCheck(): void {
    this.loadMoodleError();
  }

  private loadMoodleError(): void {
    if (this.route.snapshot.queryParams.moodleLtiErr === undefined) {
      this.moodleLtiErr = false;
    } else {
      this.moodleLtiErr = true;
    }
  }

  submitLogin(data: { email: string, pw: string }): void {
    this.error = LoginState.SUCCESSFUL;
    this.app.spinner.show();
    this.authenticate(data.email, data.pw);
  }

  private authenticate(email: string, pw: string): void {
    this.account.authenticateAndLoginUserPw(email, pw).subscribe(
      (ret: LoginState) => {
        this.app.spinner.hide();
        if (ret === LoginState.SUCCESSFUL) {
          this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/');
        } else {
          this.error = ret;
          this.form.reset();
        }
      }
    );
  }

}
