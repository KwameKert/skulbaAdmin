import { Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

export const InvoicesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: InvoiceListComponent,
    data: {
      title: 'Invoices',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Administration' },
        { title: 'Invoices' },
      ],
    },
  },
];
