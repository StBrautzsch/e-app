import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../base-app/base-app.service';
import {LoginService} from './login.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public app: BaseAppService, public login: LoginService) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.login;
    this.app.spinner.hide();
    this.login.logout();
    this.login.moodleLtiLogin();
    this.login.verification();
  }

}
