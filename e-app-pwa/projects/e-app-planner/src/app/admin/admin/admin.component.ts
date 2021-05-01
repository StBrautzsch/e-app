import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  updating = true;

  constructor(public app: BaseAppService, public admin: AdminService) {
    this.app.toolbarRefresh.subscribe(() => this.update());
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.admin;
    this.app.showToolbarRefresh = true;
    this.update();
  }

  update(): void {
    this.updating = true;
    this.admin.updateAccounts().subscribe(() => this.updating = false);
  }

}
