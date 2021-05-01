import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-msg-div',
  templateUrl: './msg-div.component.html',
  styleUrls: ['./msg-div.component.scss']
})
export class MsgDivComponent implements OnInit {

  @Input() type = 'primary';

  constructor() {
  }

  ngOnInit(): void {
  }

}
