import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {SettingsComponent} from './settings/settings.component';
import {AccountService} from '../../../../libs/src/lib/account/account-service/account-service';
import {BaseAppService} from '../../../../libs/src/lib/base-app/base-app.service';
import {ApiService} from '../../../../libs/src/lib/api/api-service/api.service';
import {Router, RouterModule} from '@angular/router';
import {accountServiceFactory} from '../../../../libs/src/lib/account/account-service/account-service-factory';
import {CalendarSettingsComponent} from './settings/calendar-settings/calendar-settings.component';
import {BaseAppModule} from '../../../../libs/src/lib/base-app/base-app.module';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {DataKeepingComponent} from './settings/data-keeping/data-keeping.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {DateRangeComponent} from './settings/date-range/date-range.component';
import {NotificationSettingsComponent} from './settings/notification-settings/notification-settings.component';


@NgModule({
  declarations: [SidenavMenuComponent, SettingsComponent, CalendarSettingsComponent, DataKeepingComponent, DateRangeComponent,
    NotificationSettingsComponent],
  exports: [
    SidenavMenuComponent
  ],
  imports: [
    CommonModule,
    BaseAppModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    NgxSliderModule,
    MatExpansionModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    {provide: AccountService, useFactory: accountServiceFactory, deps: [BaseAppService, ApiService, Router]}
  ]
})
export class PlannerModule {
}
