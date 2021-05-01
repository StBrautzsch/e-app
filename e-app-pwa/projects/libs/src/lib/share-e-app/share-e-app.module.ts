import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareEAppComponent} from './share-e-app/share-e-app.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
import {SharePlannerComponent} from './share-e-app/share-planner/share-planner.component';
import {ShareClientComponent} from './share-e-app/share-client/share-client.component';
import {BaseAppModule} from '../base-app/base-app.module';
import {FormsModule} from '@angular/forms';
import {QRCodeModule} from 'angular2-qrcode';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [ShareEAppComponent, SharePlannerComponent, ShareClientComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        ClipboardModule,
        BaseAppModule,
        QRCodeModule,
        FormsModule,
        MatCheckboxModule
    ]
})
export class ShareEAppModule {
}
