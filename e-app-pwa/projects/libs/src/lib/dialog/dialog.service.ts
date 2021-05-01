import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {TermsOfUseDialogComponent} from '../base-app/terms-of-use-dialog/terms-of-use-dialog.component';
import {PrivacyPolicyDialogComponent} from '../base-app/privacy-policy-dialog/privacy-policy-dialog.component';
import {LegalNoticeDialogComponent} from '../base-app/legal-notice-dialog/legal-notice-dialog.component';
import {DefaultDialogComponent} from './default-dialog/default-dialog.component';
import {DefaultDialogData, DefaultDialogType} from './defaut-dialog-data';
import {REPLACE_STRING, translateException} from '../msg';

export const DEFAULT_SB_TIME = 5000;

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private lastSnackbar: MatSnackBarRef<TextOnlySnackBar> = null;
  private lastSnackbarTime = 0;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    console.log('DialogService');
  }

  defaultErrorDialog(msg = '', value = ''): void {
    msg = translateException(msg).replace(REPLACE_STRING, value);
    const data: DefaultDialogData = {msg, title: '', type: DefaultDialogType.ERROR};
    this.dialog.open(DefaultDialogComponent, {data}).afterClosed().subscribe();
  }

  defaultSuccessDialog(msg: string): void {
    const data: DefaultDialogData = {msg, title: '', type: DefaultDialogType.SUCCESS};
    this.dialog.open(DefaultDialogComponent, {data}).afterClosed().subscribe();
  }

  showSnackBar(msg: string, durationMS = DEFAULT_SB_TIME): void {
    this.lastSnackbarTime = (new Date()).getTime();
    this.lastSnackbar = this.snackBar.open(msg, 'Schließen', {duration: durationMS});
    this.lastSnackbar.onAction().subscribe(() => this.lastSnackbar.dismiss());
  }

  closeShowSnackBar(): void {
    if ((this.lastSnackbar !== null) && (((new Date()).getTime() - this.lastSnackbarTime) > 200)) {
      this.lastSnackbar.dismiss();
    }
  }

  showTermsOfUseDialog(): void {
    this.dialog.open(TermsOfUseDialogComponent).afterClosed().subscribe();
  }

  showPrivacyPolicyDialog(): void {
    this.dialog.open(PrivacyPolicyDialogComponent).afterClosed().subscribe();
  }

  showLegalNoticeDialog(): void {
    this.dialog.open(LegalNoticeDialogComponent).afterClosed().subscribe();
  }

}
