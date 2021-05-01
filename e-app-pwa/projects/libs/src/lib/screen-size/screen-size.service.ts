import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  screenSize = 0;
  screenWidth = 0;
  screenHeight = 0;

  constructor() {
    console.log('ScreenSizeService');
    this.refreshScreenSize();
  }

  refreshScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  initBreakpointObserver(breakpointObserver: BreakpointObserver): void {
    breakpointObserver.observe([
      Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge
    ]).subscribe((s: BreakpointState) => {
      if (s.breakpoints[Breakpoints.XSmall]) {
        this.screenSize = 1;
      } else if (s.breakpoints[Breakpoints.Small]) {
        this.screenSize = 2;
      } else if (s.breakpoints[Breakpoints.Medium]) {
        this.screenSize = 3;
      } else if (s.breakpoints[Breakpoints.Large]) {
        this.screenSize = 4;
      } else if (s.breakpoints[Breakpoints.XLarge]) {
        this.screenSize = 5;
      } else {
        this.screenSize = 0;
      }
    });
  }

  isSmall(): boolean {
    if (this.screenSize === 1 || this.screenSize === 2) {
      return true;
    }
    return false;
  }

  isMedium(): boolean {
    if (this.screenSize === 3) {
      return true;
    }
    return false;
  }

  isLarge(): boolean {
    if (this.screenSize === 4 || this.screenSize === 5) {
      return true;
    }
    return false;
  }

}
