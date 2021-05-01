import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';

@Component({
  selector: 'app-booking-auth',
  templateUrl: './booking-auth.component.html',
  styleUrls: ['./booking-auth.component.scss']
})
export class BookingAuthComponent implements OnInit {

  constructor(public app: BaseAppService) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.booking;
  }

}
