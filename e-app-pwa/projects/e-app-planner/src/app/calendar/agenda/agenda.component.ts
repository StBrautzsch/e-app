import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {AgendaMode, CalendarService} from '../calendar-service/calendar.service';
import {CalendarViewService} from '../calendar-service/calendar-view.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarDialogService} from '../calendar-service/calendar-dialog.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  tMode = AgendaMode;

  constructor(public app: BaseAppService, public calendar: CalendarService, public view: CalendarViewService,
              public dialog: CalendarDialogService, private router: Router, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.agenda;
    this.app.showToolbarMenu = true;
    this.calendar.updateSlotsAndCalendarAndWait(
      this.view.getPlannerSettings().weeksPast, this.view.getPlannerSettings().weeksFuture)
      .subscribe(() => this.showDetailsForQueryId());
  }

  private showDetailsForQueryId(): void {
    const id = this.route.snapshot.queryParams.id;
    if (id) {
      this.location.go(this.location.path().split('?')[0]);
      this.dialog.showSlotDetailsDialogWithUpdateIfRequired(Number(id));
    }
  }

}
