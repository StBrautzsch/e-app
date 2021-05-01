import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';
import {SettingsComponent} from './settings/settings.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {AccountService} from '../../../../libs/src/lib/account/account-service/account-service';
import {BaseAppService} from '../../../../libs/src/lib/base-app/base-app.service';
import {ApiService} from '../../../../libs/src/lib/api/api-service/api.service';
import {Router, RouterModule} from '@angular/router';
import {accountServiceFactory} from '../../../../libs/src/lib/account/account-service/account-service-factory';
import {NotificationSettingsComponent} from './settings/notification-settings/notification-settings.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {BaseAppModule} from '../../../../libs/src/lib/base-app/base-app.module';


@NgModule({
  declarations: [SidenavMenuComponent, SettingsComponent, NotificationSettingsComponent],
  exports: [
    SidenavMenuComponent
  ],
  imports: [
    CommonModule,
    BaseAppModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    MatExpansionModule,
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [
    {provide: AccountService, useFactory: accountServiceFactory, deps: [BaseAppService, ApiService, Router]}
  ]
})
export class ClientModule {
}
