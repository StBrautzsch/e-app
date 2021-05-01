import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {AccountService} from '../../account-service/account-service';

@Component({
  selector: 'lib-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss']
})
export class AccountHeaderComponent implements OnInit {

  constructor(public app: BaseAppService, public account: AccountService) {
  }

  ngOnInit(): void {
  }

}
