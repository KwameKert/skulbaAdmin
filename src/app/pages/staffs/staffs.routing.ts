import { Routes } from '@angular/router';
import { StaffSearchComponent } from './staff-search/staff-search.component';
import { StaffViewComponent } from './staff-view/staff-view.component';

export const StaffsRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  {
    path: 'search',
    component: StaffSearchComponent,
    data: {
      title: 'Staff Search',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Staff Search' },
      ],
    },
  },
  {
    path: 'view/:tenantId/:staffId',
    component: StaffViewComponent,
    data: {
      title: 'Staff Details',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Staff Search', url: '/staffs/search' },
        { title: 'Staff Details' },
      ],
    },
  },
];
