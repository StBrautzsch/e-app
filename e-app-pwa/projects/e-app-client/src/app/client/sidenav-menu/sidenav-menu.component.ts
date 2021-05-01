import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {AccountService} from '../../../../../libs/src/lib/account/account-service/account-service';
import {routes, titels} from '../../../../../libs/src/lib/lib-const';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  @Output() navigate: EventEmitter<string>;

  tTitels = titels;
  tRoutes = routes;

  constructor(public app: BaseAppService, public account: AccountService) {
    this.navigate = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

}
