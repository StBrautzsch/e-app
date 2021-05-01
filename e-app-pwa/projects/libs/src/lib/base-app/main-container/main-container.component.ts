import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  constructor() {
  }

  @Input() maxWidth = 700;
  @Input() minWidth = 50;

  ngOnInit(): void {
  }

}
