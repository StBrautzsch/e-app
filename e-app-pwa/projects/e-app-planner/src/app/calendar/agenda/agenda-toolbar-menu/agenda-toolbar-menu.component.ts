import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {AgendaMode, CalendarService} from '../../calendar-service/calendar.service';
import {CalendarViewService} from '../../calendar-service/calendar-view.service';

@Component({
  selector: 'app-agenda-toolbar-menu',
  templateUrl: './agenda-toolbar-menu.component.html',
  styleUrls: ['./agenda-toolbar-menu.component.scss']
})
export class AgendaToolbarMenuComponent implements OnInit {

  tMode = AgendaMode;

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService) {
  }

  ngOnInit(): void {
  }

  changeAgenda(value: AgendaMode): void {
    this.calendar.changeAgendaMode(
      value, this.view.getPlannerSettings().weeksPast, this.view.getPlannerSettings().weeksFuture);
  }

}
