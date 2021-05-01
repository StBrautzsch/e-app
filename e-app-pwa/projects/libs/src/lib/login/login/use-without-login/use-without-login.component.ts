import {Component, OnInit} from '@angular/core';
import {BaseAppService} from '../../../base-app/base-app.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lib-use-without-login',
  templateUrl: './use-without-login.component.html',
  styleUrls: ['./use-without-login.component.scss']
})
export class UseWithoutLoginComponent implements OnInit {

  constructor(public app: BaseAppService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  useAnonym(): void {
    if (this.route.snapshot.queryParams.returnUrl) {
      this.app.router.navigateByUrl(
        this.route.snapshot.queryParams.returnUrl.replace(this.app.routes.bookingAuth, this.app.routes.bookingAnonym));
    } else {
      this.app.router.navigateByUrl(this.app.routes.bookingAnonym);
    }
  }

}
