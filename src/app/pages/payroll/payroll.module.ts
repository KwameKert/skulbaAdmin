import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { PayrollRoutes } from './payroll.routing';
import { StatutoryListComponent } from './statutory-list/statutory-list.component';
import { StatutoryDialogComponent } from './statutory-list/statutory-dialog/statutory-dialog.component';
import { PayeBandsListComponent } from './paye-bands-list/paye-bands-list.component';
import { PayeBandDialogComponent } from './paye-bands-list/paye-band-dialog/paye-band-dialog.component';

@NgModule({
  declarations: [
    StatutoryListComponent,
    StatutoryDialogComponent,
    PayeBandsListComponent,
    PayeBandDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PayrollRoutes),
    MaterialModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class PayrollModule {}
