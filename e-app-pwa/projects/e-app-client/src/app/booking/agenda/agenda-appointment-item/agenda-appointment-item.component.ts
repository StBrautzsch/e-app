import {Component, Input, OnInit} from '@angular/core';
import {AgendaItemAppointment} from '../../../../../../libs/src/lib/e-app/agenda/agenda-item';
import {BaseAppService} from '../../../../../../libs/src/lib/base-app/base-app.service';
import {AppointmentService} from '../appointment.service';

@Component({
  selector: 'app-agenda-appointment-item',
  templateUrl: './agenda-appointment-item.component.html',
  styleUrls: ['./agenda-appointment-item.component.scss']
})
export class AgendaAppointmentItemComponent implements OnInit {

  @Input() item: AgendaItemAppointment;
  mark = false;

  constructor(public app: BaseAppService, public appointment: AppointmentService) {
  }

  ngOnInit(): void {
  }

}
