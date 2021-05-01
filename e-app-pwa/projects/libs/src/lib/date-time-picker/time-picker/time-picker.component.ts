import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lib-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  @Input() hour: number;
  @Input() min: number;

  @Output() hourModelChange = new EventEmitter<number>();
  @Output() minModelChange = new EventEmitter<number>();

  @Output() addDay = new EventEmitter<any>();
  @Output() subDay = new EventEmitter<any>();

  hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  minutes = [0, 15, 30, 45];

  constructor() {
  }

  ngOnInit(): void {
  }

  add(): void {
    if (this.min === 45) {
      this.min = 0;
      if (this.hour === 23) {
        this.hour = 0;
        this.addDay.emit();
      } else {
        this.hour++;
      }
    } else {
      this.min += 15;
    }
    this.minModelChange.emit(this.min);
    this.hourModelChange.emit(this.hour);
  }

  sub(): void {
    if (this.min === 0) {
      this.min = 45;
      if (this.hour === 0) {
        this.hour = 23;
        this.subDay.emit();
      } else {
        this.hour--;
      }
    } else {
      this.min -= 15;
    }
    this.minModelChange.emit(this.min);
    this.hourModelChange.emit(this.hour);
  }

}
