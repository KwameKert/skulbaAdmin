import { Routes } from '@angular/router';
import { StatutoryListComponent } from './statutory-list/statutory-list.component';
import { PayeBandsListComponent } from './paye-bands-list/paye-bands-list.component';

export const PayrollRoutes: Routes = [
  { path: '', redirectTo: 'statutory', pathMatch: 'full' },
  {
    path: 'statutory',
    component: StatutoryListComponent,
    data: {
      title: 'Statutory Deductions',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Payroll' },
        { title: 'Statutory Deductions' },
      ],
    },
  },
  {
    path: 'paye-bands',
    component: PayeBandsListComponent,
    data: {
      title: 'PAYE Bands',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Payroll' },
        { title: 'PAYE Bands' },
      ],
    },
  },
];
