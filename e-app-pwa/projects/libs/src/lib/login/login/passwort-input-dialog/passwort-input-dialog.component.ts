import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lib-passwort-input-dialog',
  templateUrl: './passwort-input-dialog.component.html',
  styleUrls: ['./passwort-input-dialog.component.scss']
})
export class PasswortInputDialogComponent implements OnInit {

  password = '';
  hide = true;
  error = false;

  constructor(public app: BaseAppService, protected dialogRef: MatDialogRef<PasswortInputDialogComponent>) {
  }

  ngOnInit(): void {
  }

}
