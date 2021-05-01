import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ProgressSpinnerComponent} from './progress-spinner/progress-spinner.component';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {

  private spinnerOverlay: OverlayRef;
  private isShow = false;

  constructor(private overlay: Overlay) {
  }

  show(): void {
    if (!this.isShow) {
      this.isShow = true;
      const positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
      this.spinnerOverlay = this.overlay.create({
        positionStrategy,
        hasBackdrop: true
      });
      this.spinnerOverlay.attach(new ComponentPortal(ProgressSpinnerComponent));
    }
  }

  hide(): void {
    if (this.isShow) {
      this.isShow = false;
      this.spinnerOverlay.dispose();
    }
  }

}
