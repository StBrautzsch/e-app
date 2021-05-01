import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LabelType, Options} from '@angular-slider/ngx-slider';
import {SlotFilter} from '../../../slot-filter';
import {BaseAppService} from '../../../../../../../../libs/src/lib/base-app/base-app.service';
import {BookingService} from '../../../booking.service';

@Component({
  selector: 'app-choose-slot-filter',
  templateUrl: './choose-slot-filter.component.html',
  styleUrls: ['./choose-slot-filter.component.scss']
})
export class ChooseSlotFilterComponent implements OnInit {

  @Input() slotFilter: SlotFilter;
  @Output() filterChange = new EventEmitter<any>();

  optionsHours: Options = {
    floor: 0,
    ceil: 24,
    translate: (value: number, label: LabelType): string => {
      return value + ':00 Uhr';
    }
  };

  optionsDuration: Options = {
    floor: 0,
    ceil: 4,
    translate: (value: number, label: LabelType): string => {
      if (value === 0) {
        return '15 Min.';
      }
      if (value === 1) {
        return '30 Min.';
      }
      if (value === 2) {
        return '1 Std.';
      }
      if (value === 3) {
        return '2 Std.';
      }
      return 'maximal';
    }
  };

  constructor(public app: BaseAppService, public booking: BookingService) {
  }

  ngOnInit(): void {
  }

  refreshSlotList(): void {
    if (!!this.slotFilter.pickDateStart && !!this.slotFilter.pickDateEnd) {
      this.filterChange.emit();
    }
  }

}
