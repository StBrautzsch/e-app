import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BaseAppComponent} from '../../../libs/src/lib/base-app/base-app/base-app.component';
import {BaseAppService} from '../../../libs/src/lib/base-app/base-app.service';
import {environment} from '../environments/environment';
import {libConst} from '../../../libs/src/lib/lib-const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(BaseAppComponent) appContainer: BaseAppComponent;

  route: string;
  appNameLong = libConst.plannerAppNameLong;
  appNameShort = libConst.plannerAppNameShort;

  constructor(private router: Router, public app: BaseAppService) {
    console.log(this.appNameLong);
    app.isPlanner = true;
    app.isProduction = environment.production;
    app.version = environment.appVersion;
    app.plannerUrl = environment.plannerUrl;
    app.clientUrl = environment.clientUrl;
    app.prototypeAktive = environment.demoMode;
    this.route = this.router.url;
  }

  navigate(route: string): void {
    this.route = route;
    this.appContainer.navigate();
    this.router.navigate([route]);
  }

}
