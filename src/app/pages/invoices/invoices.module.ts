import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { InvoicesRoutes } from './invoices.routing';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { GenerateInvoiceDialogComponent } from './invoice-list/generate-invoice-dialog/generate-invoice-dialog.component';
import { InvoiceViewDialogComponent } from './invoice-list/invoice-view-dialog/invoice-view-dialog.component';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    InvoiceListComponent,
    GenerateInvoiceDialogComponent,
    InvoiceViewDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(InvoicesRoutes),
    MaterialModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
    ConfirmDialogComponent,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class InvoicesModule {}
