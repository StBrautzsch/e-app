import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DurationHourMin, TimeTools} from '../../time-tools';

@Component({
  selector: 'lib-duration-picker',
  templateUrl: './duration-picker.component.html',
  styleUrls: ['./duration-picker.component.scss']
})
export class DurationPickerComponent implements OnInit {

  @Input() duration: DurationHourMin;
  @Output() modelChange = new EventEmitter<DurationHourMin>();

  constructor() {
  }

  ngOnInit(): void {
  }

  add(): void {
    if (this.duration.m === 45) {
      this.duration.m = 0;
      this.duration.h++;
    } else {
      this.duration.m += 15;
    }
    this.modelChange.emit(this.duration);
  }

  sub(): void {
    if (this.duration.m === 0) {
      this.duration.m = 45;
      if (this.duration.h !== 0) {
        this.duration.h--;
      }
    } else {
      this.duration.m -= 15;
    }
    this.modelChange.emit(this.duration);
  }

  calcDuration(): number {
    return TimeTools.hourMinToMin(this.duration);
  }

}
