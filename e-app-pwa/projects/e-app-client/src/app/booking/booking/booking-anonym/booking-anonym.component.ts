import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingService} from '../booking.service';

@Component({
  selector: 'app-booking-anonym',
  templateUrl: './booking-anonym.component.html',
  styleUrls: ['./booking-anonym.component.scss']
})
export class BookingAnonymComponent implements OnInit {

  constructor(public app: BaseAppService, public booking: BookingService,
              private router: Router, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.booking;
    this.showDetailsForQueryReference();
  }

  private showDetailsForQueryReference(): void {
    const reference = this.route.snapshot.queryParams.reference;
    if (reference) {
      this.location.go(this.location.path().split('?')[0]);
      this.booking.findAppointmentAndShowDetailsDialog(reference);
    }
  }

}
