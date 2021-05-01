import {Component, Input, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {AgendaItemSlot} from '../../../../../../libs/src/lib/e-app/agenda/agenda-item';
import {CalendarDialogService} from '../../calendar-service/calendar-dialog.service';

@Component({
  selector: 'app-agenda-slot-item',
  templateUrl: './agenda-slot-item.component.html',
  styleUrls: ['./agenda-slot-item.component.scss']
})
export class AgendaSlotItemComponent implements OnInit {

  @Input() item: AgendaItemSlot;
  mark = false;

  constructor(public app: BaseAppService, public dialog: CalendarDialogService) {
  }

  ngOnInit(): void {
  }

}
