import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lib-password-reset-dialog',
  templateUrl: './password-reset-dialog.component.html',
  styleUrls: ['./password-reset-dialog.component.scss']
})
export class PasswordResetDialogComponent implements OnInit {

  mail = '';

  constructor(public app: BaseAppService, protected dialogRef: MatDialogRef<PasswordResetDialogComponent>) {
  }

  ngOnInit(): void {
  }

}
