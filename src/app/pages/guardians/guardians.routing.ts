import { Routes } from '@angular/router';
import { GuardianSearchComponent } from './guardian-search/guardian-search.component';
import { GuardianViewComponent } from './guardian-view/guardian-view.component';

export const GuardiansRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  {
    path: 'search',
    component: GuardianSearchComponent,
    data: {
      title: 'Guardian Search',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Guardian Search' },
      ],
    },
  },
  {
    path: 'view/:tenantId/:guardianId',
    component: GuardianViewComponent,
    data: {
      title: 'Guardian Details',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Guardian Search', url: '/guardians/search' },
        { title: 'Guardian Details' },
      ],
    },
  },
];
