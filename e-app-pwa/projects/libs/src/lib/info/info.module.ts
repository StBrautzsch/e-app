import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoComponent} from './info/info.component';
import {BaseAppModule} from '../base-app/base-app.module';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {InfoMainComponent} from './info/info-main/info-main.component';
import {InfoTechnicalComponent} from './info/info-technical/info-technical.component';
import {ApiService} from '../api/api-service/api.service';
import {apiServiceFactory} from '../api/api-service/api-service-factory';
import {BaseAppService} from '../base-app/base-app.service';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../account/account-service/account-service';
import {accountServiceFactory} from '../account/account-service/account-service-factory';
import {MatButtonModule} from '@angular/material/button';
import {InfoLegalComponent} from './info/info-legal/info-legal.component';


@NgModule({
  declarations: [InfoComponent, InfoMainComponent, InfoTechnicalComponent, InfoLegalComponent],
  imports: [
    CommonModule,
    BaseAppModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    {provide: ApiService, useFactory: apiServiceFactory, deps: [BaseAppService, HttpClient]},
    {provide: AccountService, useFactory: accountServiceFactory, deps: [BaseAppService, ApiService]}
  ]
})
export class InfoModule {
}
