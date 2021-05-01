import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {AppointmentService} from './appointment.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  constructor(public app: BaseAppService, public appointment: AppointmentService,
              private router: Router, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.app.page = this.app.titles.agenda;
    this.app.showToolbarRefresh = true;
    this.appointment.updateAppointmentsAndAgendaAndWait()
      .subscribe(() => this.showDetailsForQueryId());
  }

  private showDetailsForQueryId(): void {
    const id = this.route.snapshot.queryParams.id;
    if (id) {
      this.location.go(this.location.path().split('?')[0]);
      this.appointment.showAppointmentDetailsDialogById(Number(id));
    }
  }

}
