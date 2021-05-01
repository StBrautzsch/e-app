import {Component, Input, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {AdminService} from '../../admin.service';
import {Account} from '../../../../../../libs/src/lib/data/account';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  @Input() item: Account;
  mark = false;

  constructor(public app: BaseAppService, public admin: AdminService) {
  }

  ngOnInit(): void {
  }

  accentIfTrue(value: boolean): ThemePalette {
    if (value) {
      return 'accent';
    }
    return null;
  }

}
