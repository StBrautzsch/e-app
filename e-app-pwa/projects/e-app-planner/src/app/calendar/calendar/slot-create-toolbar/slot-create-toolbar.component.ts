import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {CalendarService, SpeedSlotCreateMode} from '../../calendar-service/calendar.service';


@Component({
  selector: 'app-slot-create-toolbar',
  templateUrl: './slot-create-toolbar.component.html',
  styleUrls: ['./slot-create-toolbar.component.scss']
})
export class SlotCreateToolbarComponent implements OnInit {

  tSpeedSlotCreateMode = SpeedSlotCreateMode;

  constructor(public app: BaseAppService, public calendar: CalendarService) {
  }

  ngOnInit(): void {
  }

  setMode(mode: SpeedSlotCreateMode): void {
    this.calendar.speedSlotCreateMode = mode;
  }

  getColor(mode: SpeedSlotCreateMode): string {
    if (mode === this.calendar.speedSlotCreateMode) {
      return 'primary';
    }
    return '';
  }

  calcNavOffset(): number {
    const offset = 280;
    if (!this.app.screen.isSmall() && this.app.isSidenavOpen()) {
      return this.app.sidenavWidth / 2 + offset;
    }
    return offset;
  }

}
