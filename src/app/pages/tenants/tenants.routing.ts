import { Routes } from '@angular/router';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantViewComponent } from './tenant-view/tenant-view.component';

export const TenantsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: TenantListComponent,
    data: {
      title: 'Tenants',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Tenants' },
      ],
    },
  },
  {
    path: 'view/:id',
    component: TenantViewComponent,
    data: {
      title: 'Tenant Details',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Tenants', url: '/tenants/list' },
        { title: 'Tenant Details' },
      ],
    },
  },
];
