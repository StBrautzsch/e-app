import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public app: BaseAppService) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.settings;
  }

}
