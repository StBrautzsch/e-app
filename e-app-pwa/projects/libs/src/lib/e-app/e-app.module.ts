import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendaHeaderItemComponent} from './agenda/agenda-header-item/agenda-header-item.component';


@NgModule({
  declarations: [AgendaHeaderItemComponent],
  imports: [
    CommonModule,
  ],
  exports: [AgendaHeaderItemComponent]
})
export class EAppModule {
}
