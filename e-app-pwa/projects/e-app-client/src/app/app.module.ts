import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BaseAppModule} from '../../../libs/src/lib/base-app/base-app.module';
import {ClientModule} from './client/client.module';
import {BookingModule} from './booking/booking.module';
import {AccountModule} from '../../../libs/src/lib/account/account.module';
import {LoginModule} from '../../../libs/src/lib/login/login.module';
import {ShareEAppModule} from '../../../libs/src/lib/share-e-app/share-e-app.module';
import {ApiService} from '../../../libs/src/lib/api/api-service/api.service';
import {AccountService} from '../../../libs/src/lib/account/account-service/account-service';
import {ApiClientService} from '../../../libs/src/lib/api/api-service/api-client.service';
import {AccountClientService} from '../../../libs/src/lib/account/account-service/account-client.service';
import {InfoModule} from '../../../libs/src/lib/info/info.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ClientModule,
    BaseAppModule,
    BookingModule,
    AccountModule,
    LoginModule,
    ShareEAppModule,
    InfoModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-de'},
    {provide: ApiService, useClass: ApiClientService},
    {provide: AccountService, useClass: AccountClientService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
