import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../base-app/base-app.service';

@Component({
  selector: 'lib-prototype-info',
  templateUrl: './prototype-info.component.html',
  styleUrls: ['./prototype-info.component.scss']
})
export class PrototypeInfoComponent implements OnInit {

  constructor(public app: BaseAppService) {
  }

  ngOnInit(): void {
  }

}
