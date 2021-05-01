import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountSettingsComponent} from '../../../libs/src/lib/account/account-settings/account-settings.component';
import {ShareEAppComponent} from '../../../libs/src/lib/share-e-app/share-e-app/share-e-app.component';
import {LoginComponent} from '../../../libs/src/lib/login/login/login.component';
import {AdminComponent} from './admin/admin/admin.component';
import {SettingsComponent} from './planner/settings/settings.component';
import {CalendarComponent} from './calendar/calendar/calendar.component';
import {AgendaComponent} from './calendar/agenda/agenda.component';
import {LoginGard} from '../../../libs/src/lib/account/guards/login-guard';
import {AdminGard} from '../../../libs/src/lib/account/guards/admin-guard';
import {InfoComponent} from '../../../libs/src/lib/info/info/info.component';
import {routes as r} from '../../../libs/src/lib/lib-const';
import {RenewLoginComponent} from '../../../libs/src/lib/login/renew-login/renew-login.component';
import {DefaultGard} from '../../../libs/src/lib/account/guards/default-guard';

const routes: Routes = [
  {path: r.agenda, canActivate: [LoginGard], component: AgendaComponent},
  {path: r.calendar, canActivate: [LoginGard], component: CalendarComponent},
  {path: r.settings, canActivate: [LoginGard], component: SettingsComponent},
  {path: r.admin, canActivate: [AdminGard], component: AdminComponent},
  {path: r.account, canActivate: [LoginGard], component: AccountSettingsComponent},
  {path: r.share, canActivate: [DefaultGard], component: ShareEAppComponent},
  {path: r.info, canActivate: [DefaultGard], component: InfoComponent},
  {path: r.login, component: LoginComponent},
  {path: r.loginRenew, component: RenewLoginComponent},
  {path: '', redirectTo: r.agenda, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
