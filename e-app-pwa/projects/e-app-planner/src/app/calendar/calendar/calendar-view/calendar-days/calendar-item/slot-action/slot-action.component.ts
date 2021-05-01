import {Component, Input, OnInit} from '@angular/core';
import {CalendarService} from '../../../../../calendar-service/calendar.service';
import {CalendarViewService} from '../../../../../calendar-service/calendar-view.service';
import {Slot} from '../../../../../../../../../libs/src/lib/data/slot';
import {t} from '../../../../../../../../../libs/src/lib/time-tools';
import {CalendarDialogService} from '../../../../../calendar-service/calendar-dialog.service';

@Component({
  selector: 'app-slot-action',
  templateUrl: './slot-action.component.html',
  styleUrls: ['./slot-action.component.scss']
})
export class SlotActionComponent implements OnInit {

  @Input() slot: Slot;

  constructor(public calendar: CalendarService, public view: CalendarViewService, public dialog: CalendarDialogService) {
  }

  ngOnInit(): void {
  }

  calcAppointmentHeight(): number {
    return this.view.slotHeight * ((this.slot.duration * t.MS_PER_MIN) / this.calendar.interval);
  }

  tooltipForBookedSlot(text: string): string {
    if (this.slot.bookingRemark !== '') {
      return text + ': ' + this.slot.bookingRemark;
    }
    return text;
  }

}
