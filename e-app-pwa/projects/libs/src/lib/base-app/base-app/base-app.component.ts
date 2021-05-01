import {AfterViewInit, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {BaseAppService} from '../base-app.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {SwUpdate} from '@angular/service-worker';
import {MatSidenav} from '@angular/material/sidenav';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'lib-base-app',
  templateUrl: './base-app.component.html',
  styleUrls: ['./base-app.component.scss']
})
export class BaseAppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @Input() appNameShort = 'App';
  @Input() appNameLong = 'App';

  installPrompt: any;
  sidenavWidth = 200;

  constructor(public app: BaseAppService, private matSnackbar: MatSnackBar,
              public breakpointObserver: BreakpointObserver, public router: Router, private swUpdate: SwUpdate) {
  }

  ngOnInit(): void {
    this.app.appNameLong = this.appNameLong;
    this.app.appNameShort = this.appNameShort;
    this.app.sidenavWidth = this.sidenavWidth;
    this.app.screen.initBreakpointObserver(this.breakpointObserver);
    this.initInstall();
    this.initUpdates();
  }

  ngAfterViewInit(): void {
    this.app.setSidenav(this.sidenav);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.app.screen.refreshScreenSize();
  }

  public navigate(): void {
    this.app.showToolbarMenu = false;
    this.app.showToolbarRefresh = false;
    if (this.app.screen.isSmall()) {
      this.sidenav.close();
    }
  }

  install(): void {
    this.installPrompt.prompt();
  }

  initInstall(): void {
    window.addEventListener('beforeinstallprompt', event => {
      this.installPrompt = event;
    });
  }

  initUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => this.swUpdate.activateUpdate().then(() => location.reload()));
      this.swUpdate.checkForUpdate();
    }
  }

}
