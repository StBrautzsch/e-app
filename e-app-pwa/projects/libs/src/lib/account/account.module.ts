import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {ApiModule} from '../api/api.module';
import {AccountService} from './account-service/account-service';
import {BaseAppService} from '../base-app/base-app.service';
import {ApiService} from '../api/api-service/api.service';
import {accountServiceFactory} from './account-service/account-service-factory';
import {apiServiceFactory} from '../api/api-service/api-service-factory';
import {HttpClient} from '@angular/common/http';
import {BaseAppModule} from '../base-app/base-app.module';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {AccountHeaderComponent} from './account-settings/account-header/account-header.component';
import {AccountDataComponent} from './account-settings/account-data/account-data.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AccountPwComponent} from './account-settings/account-pw/account-pw.component';
import {AccountMailComponent} from './account-settings/account-mail/account-mail.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ICalFeedsComponent} from './account-settings/i-cal-feeds/i-cal-feeds.component';
import {ClipboardModule} from '@angular/cdk/clipboard';


@NgModule({
  declarations: [AccountSettingsComponent, AccountHeaderComponent, AccountDataComponent, AccountPwComponent, AccountMailComponent, ICalFeedsComponent],
    imports: [
        CommonModule,
        ApiModule,
        BaseAppModule,
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatSlideToggleModule,
        ClipboardModule
    ],
  providers: [
    {provide: ApiService, useFactory: apiServiceFactory, deps: [BaseAppService, HttpClient]},
    {provide: AccountService, useFactory: accountServiceFactory, deps: [BaseAppService, ApiService]}
  ]
})
export class AccountModule {
}
