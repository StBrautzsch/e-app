import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseAppComponent} from './base-app/base-app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MainContainerComponent} from './main-container/main-container.component';
import {MsgDivComponent} from './msg-div/msg-div.component';
import {ProgressSpinnerModule} from '../progress-spinner/progress-spinner.module';
import {DividerComponent} from './divider/divider.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PrivacyPolicyDialogComponent} from './privacy-policy-dialog/privacy-policy-dialog.component';
import {TermsOfUseDialogComponent} from './terms-of-use-dialog/terms-of-use-dialog.component';
import {LegalNoticeDialogComponent} from './legal-notice-dialog/legal-notice-dialog.component';
import {FormsModule} from '@angular/forms';
import {DialogModule} from '../dialog/dialog.module';


@NgModule({
  declarations: [BaseAppComponent, MainContainerComponent, MsgDivComponent, DividerComponent,
    PrivacyPolicyDialogComponent, TermsOfUseDialogComponent, LegalNoticeDialogComponent],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    DialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    FormsModule
  ],
  providers: [],
  exports: [BaseAppComponent, MainContainerComponent, MsgDivComponent, DividerComponent]
})
export class BaseAppModule {
}
