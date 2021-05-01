import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';

@Component({
  selector: 'lib-info-main',
  templateUrl: './info-main.component.html',
  styleUrls: ['./info-main.component.scss']
})
export class InfoMainComponent implements OnInit {

  constructor(public app: BaseAppService) {
  }

  ngOnInit(): void {
  }

}
