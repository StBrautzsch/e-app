import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {AdminService} from '../../admin.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-account-filter',
  templateUrl: './account-filter.component.html',
  styleUrls: ['./account-filter.component.scss']
})
export class AccountFilterComponent implements OnInit {

  constructor(public app: BaseAppService, public admin: AdminService) {
  }

  ngOnInit(): void {
  }

  accentIfTrue(value: boolean): ThemePalette {
    if (value) {
      return 'primary';
    }
    return null;
  }

}
