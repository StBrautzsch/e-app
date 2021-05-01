import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrototypeInfoComponent} from './prototype-info/prototype-info.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [PrototypeInfoComponent],
  exports: [
    PrototypeInfoComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class PrototypeModule { }
