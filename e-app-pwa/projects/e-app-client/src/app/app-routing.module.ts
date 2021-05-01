import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgendaComponent} from './booking/agenda/agenda.component';
import {BookingAnonymComponent} from './booking/booking/booking-anonym/booking-anonym.component';
import {AccountSettingsComponent} from '../../../libs/src/lib/account/account-settings/account-settings.component';
import {SettingsComponent} from './client/settings/settings.component';
import {ShareEAppComponent} from '../../../libs/src/lib/share-e-app/share-e-app/share-e-app.component';
import {LoginComponent} from '../../../libs/src/lib/login/login/login.component';
import {LoginGard} from '../../../libs/src/lib/account/guards/login-guard';
import {InfoComponent} from '../../../libs/src/lib/info/info/info.component';
import {routes as r} from '../../../libs/src/lib/lib-const';
import {BookingAuthComponent} from './booking/booking/booking-auth/booking-auth.component';
import {BookingAnonymGard} from '../../../libs/src/lib/account/guards/booking-anonym-guard';
import {RenewLoginComponent} from '../../../libs/src/lib/login/renew-login/renew-login.component';
import {DefaultGard} from '../../../libs/src/lib/account/guards/default-guard';

const routes: Routes = [
  {path: r.agenda, canActivate: [LoginGard], component: AgendaComponent},
  {path: r.bookingAnonym, canActivate: [BookingAnonymGard], component: BookingAnonymComponent},
  {path: r.bookingAuth, canActivate: [LoginGard], component: BookingAuthComponent},
  {path: r.account, canActivate: [LoginGard], component: AccountSettingsComponent},
  {path: r.settings, canActivate: [LoginGard], component: SettingsComponent},
  {path: r.share, canActivate: [DefaultGard], component: ShareEAppComponent},
  {path: r.info, canActivate: [DefaultGard], component: InfoComponent},
  {path: r.login, component: LoginComponent},
  {path: r.loginRenew, component: RenewLoginComponent},
  {path: '', redirectTo: r.bookingAuth, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
