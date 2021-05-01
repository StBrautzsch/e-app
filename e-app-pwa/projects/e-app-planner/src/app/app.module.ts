import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BaseAppModule} from '../../../libs/src/lib/base-app/base-app.module';
import {PlannerModule} from './planner/planner.module';
import {AdminModule} from './admin/admin.module';
import {CalendarModule} from './calendar/calendar.module';
import {AccountModule} from '../../../libs/src/lib/account/account.module';
import {LoginModule} from '../../../libs/src/lib/login/login.module';
import {ShareEAppModule} from '../../../libs/src/lib/share-e-app/share-e-app.module';
import {ApiService} from '../../../libs/src/lib/api/api-service/api.service';
import {AccountService} from '../../../libs/src/lib/account/account-service/account-service';
import {ApiPlannerService} from '../../../libs/src/lib/api/api-service/api-planner.service';
import {AccountPlannerService} from '../../../libs/src/lib/account/account-service/account-planner.service';
import {InfoModule} from '../../../libs/src/lib/info/info.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BaseAppModule,
    PlannerModule,
    AdminModule,
    CalendarModule,
    AccountModule,
    LoginModule,
    ShareEAppModule,
    InfoModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-de'},
    {provide: ApiService, useClass: ApiPlannerService},
    {provide: AccountService, useClass: AccountPlannerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
