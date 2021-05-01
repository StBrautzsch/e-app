import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '../account-service/account-service';
import {BaseAppService} from '../../base-app/base-app.service';
import {ApiService} from '../../api/api-service/api.service';

@Injectable({
  providedIn: 'root'
})

export class BookingAnonymGard implements CanActivate {

  constructor(private router: Router, private account: AccountService, private app: BaseAppService, private api: ApiService) {
  }

  canActivate(route: ActivatedRouteSnapshot, routerSnapshot: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.account.isAuth()) {
      this.router.navigate([this.app.routes.bookingAuth]);
    }

    return true;
  }

}
