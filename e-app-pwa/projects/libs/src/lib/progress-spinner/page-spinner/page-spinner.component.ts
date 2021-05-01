import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-page-spinner',
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.scss']
})
export class PageSpinnerComponent implements OnInit {

  @Input() marginTop = 50;

  constructor() {
  }

  ngOnInit(): void {
  }

}
