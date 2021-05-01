import {EventEmitter, Inject, Injectable, LOCALE_ID} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ScreenSizeService} from '../screen-size/screen-size.service';
import {DialogService} from '../dialog/dialog.service';
import {ProgressSpinnerService} from '../progress-spinner/progress-spinner.service';
import {Router} from '@angular/router';
import {routes, titels} from '../lib-const';
import {DatePipe} from '@angular/common';
import {User} from '../data/user';
import {SB_MSG} from '../msg';

export const SIDENAV_MODE_OVER = 'over';
export const SIDENAV_MODE_SIDE = 'side';

@Injectable({
  providedIn: 'root'
})
export class BaseAppService {

  private sidenav: MatSidenav;
  sidenavWidth: number;
  isPlanner = false;
  appNameShort = 'App';
  appNameLong = 'App';
  plannerUrl = '';
  clientUrl = '';
  page = '';
  user: User = null;
  showToolbarMenu = false;
  showToolbarRefresh = false;
  isProduction = false;
  version: string;
  routes = routes;
  titles = titels;
  prototypeAktive = false;
  sidenavChangeEvent = new EventEmitter();
  toolbarRefresh = new EventEmitter();

  datePipe: DatePipe;

  constructor(public screen: ScreenSizeService, public spinner: ProgressSpinnerService, public dialog: DialogService,
              public router: Router, @Inject(LOCALE_ID) localeId) {
    console.log('BaseAppService');
    this.datePipe = new DatePipe(localeId);
  }

  public getSidenavMode(): string {
    if (this.screen.isSmall()) {
      return SIDENAV_MODE_OVER;
    }
    return SIDENAV_MODE_SIDE;
  }

  calcContentWidth(): number {
    if (this.getSidenavMode() === SIDENAV_MODE_OVER) {
      return this.screen.screenWidth;
    }
    if (this.isSidenavOpen()) {
      return this.screen.screenWidth - this.sidenavWidth;
    }
    return this.screen.screenWidth;
  }

  setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  isSidenavOpen(): boolean {
    if (this.sidenav !== undefined) {
      return this.sidenav.opened;
    }
    return true;
  }

  log(value: string): void {
    console.log(value);
  }

  newLoginRequired(navigate: boolean, snackbar: boolean): void {
    if (navigate) {
      this.router.navigate([this.routes.login]);
    }
    if (snackbar) {
      this.dialog.showSnackBar(SB_MSG.NEW_LOGIN_REQUIRED);
    }
  }

  switchPrototype(): void {
    this.prototypeAktive = !this.prototypeAktive;
  }

  sleep(s: number): any { // pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }

  sleepMS(ms: number): any { // pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
