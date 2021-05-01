import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {ApiService} from '../../../api/api-service/api.service';

@Component({
  selector: 'lib-info-technical',
  templateUrl: './info-technical.component.html',
  styleUrls: ['./info-technical.component.scss']
})
export class InfoTechnicalComponent implements OnInit {

  pingResult = '';

  constructor(public app: BaseAppService, public api: ApiService) {
  }

  ngOnInit(): void {
  }

  ping(): void {
    this.pingResult = '...';
    const t = Date.now();
    this.api.ping().subscribe(((ret: string) => this.pingResult = ret + ' (' + (Date.now() - t) + 'ms)'));
  }

}
