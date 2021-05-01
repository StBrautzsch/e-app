import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';

@Component({
  selector: 'lib-info-legal',
  templateUrl: './info-legal.component.html',
  styleUrls: ['./info-legal.component.scss']
})
export class InfoLegalComponent implements OnInit {

  constructor(public app: BaseAppService) {
  }

  ngOnInit(): void {
  }

}
