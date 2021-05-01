import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../base-app/base-app.service';

@Component({
  selector: 'lib-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(public app: BaseAppService) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.info;
  }

}
