import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '../account-service/account-service';
import {BaseAppService} from '../../base-app/base-app.service';
import {ApiService} from '../../api/api-service/api.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGard implements CanActivate {

  constructor(private router: Router, private account: AccountService, private app: BaseAppService, private api: ApiService) {
  }

  canActivate(route: ActivatedRouteSnapshot, routerSnapshot: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.account.isAuth() || !this.app.isPlanner || !this.account.castPlanner().isAdmin()) {
      this.routeToLogin(routerSnapshot);
    }
    if (this.api.isTokenExpired()) {
      this.app.newLoginRequired(false, true);
      this.routeToLogin(routerSnapshot);
    }
    return true;
  }

  private routeToLogin(routerSnapshot: RouterStateSnapshot): void {
    const url = encodeURI(routerSnapshot.url);
    if (this.account.isValidTokenExisting()) {
      this.router.navigate([this.app.routes.loginRenew], {queryParams: {returnUrl: url}});
    } else {
      this.router.navigate([this.app.routes.login], {queryParams: {returnUrl: url}});
    }
  }

}
