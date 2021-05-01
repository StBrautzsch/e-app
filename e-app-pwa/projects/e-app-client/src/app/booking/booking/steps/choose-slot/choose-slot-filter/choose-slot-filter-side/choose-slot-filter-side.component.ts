import {Component, OnInit} from '@angular/core';
import {ChooseSlotFilterComponent} from '../choose-slot-filter.component';
import {BaseAppService} from '../../../../../../../../../libs/src/lib/base-app/base-app.service';
import {BookingService} from '../../../../booking.service';

@Component({
  selector: 'app-choose-slot-filter-side',
  templateUrl: './choose-slot-filter-side.component.html',
  styleUrls: ['./choose-slot-filter-side.component.scss']
})
export class ChooseSlotFilterSideComponent extends ChooseSlotFilterComponent implements OnInit {

  constructor(public app: BaseAppService, public booking: BookingService) {
    super(app, booking);
  }

  ngOnInit(): void {
  }

}
