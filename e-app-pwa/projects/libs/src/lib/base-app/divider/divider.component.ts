import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {

  @Input() heightBefore = 0;
  @Input() heightAfter = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}
