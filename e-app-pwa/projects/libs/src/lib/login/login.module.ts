import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {BaseAppModule} from '../base-app/base-app.module';
import {UseWithoutLoginComponent} from './login/use-without-login/use-without-login.component';
import {MatCardModule} from '@angular/material/card';
import {LoginInputComponent} from './login/login-input/login-input.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {PrototypeModule} from '../prototype/prototype.module';
import {BaseAppService} from '../base-app/base-app.service';
import {ApiService} from '../api/api-service/api.service';
import {AccountService} from '../account/account-service/account-service';
import {accountServiceFactory} from '../account/account-service/account-service-factory';
import {apiServiceFactory} from '../api/api-service/api-service-factory';
import {HttpClient} from '@angular/common/http';
import {RenewLoginComponent} from './renew-login/renew-login.component';
import {CreateAccountComponent} from './login/create-account/create-account.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PasswortInputDialogComponent} from './login/passwort-input-dialog/passwort-input-dialog.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {PasswordResetDialogComponent} from './login/password-reset-dialog/password-reset-dialog.component';


@NgModule({
  declarations: [LoginComponent, UseWithoutLoginComponent, LoginInputComponent, RenewLoginComponent, CreateAccountComponent, PasswortInputDialogComponent, PasswordResetDialogComponent],
  imports: [
    CommonModule,
    BaseAppModule,
    PrototypeModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [
    {provide: ApiService, useFactory: apiServiceFactory, deps: [BaseAppService, HttpClient]},
    {provide: AccountService, useFactory: accountServiceFactory, deps: [BaseAppService, ApiService]}
  ]
})
export class LoginModule {
}
