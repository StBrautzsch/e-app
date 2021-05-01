import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressSpinnerComponent} from './progress-spinner/progress-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {PageSpinnerComponent} from './page-spinner/page-spinner.component';


@NgModule({
  declarations: [ProgressSpinnerComponent, PageSpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    PageSpinnerComponent
  ],
})
export class ProgressSpinnerModule {
}
