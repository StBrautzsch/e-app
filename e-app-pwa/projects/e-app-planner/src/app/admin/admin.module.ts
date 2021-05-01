import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin/admin.component';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ProgressSpinnerModule} from '../../../../libs/src/lib/progress-spinner/progress-spinner.module';
import {BaseAppModule} from '../../../../libs/src/lib/base-app/base-app.module';
import {AccountItemComponent} from './admin/account-item/account-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {AccountFilterComponent} from './admin/account-filter/account-filter.component';
import {AccountDialogComponent} from './admin/account-dialog/account-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [AdminComponent, AccountItemComponent, AccountFilterComponent, AccountDialogComponent],
    imports: [
        CommonModule,
        BaseAppModule,
        ProgressSpinnerModule,
        MatCardModule,
        ScrollingModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatListModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatTooltipModule
    ]
})
export class AdminModule {
}
