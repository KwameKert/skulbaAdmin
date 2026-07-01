import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [authGuard, roleGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboards/dashboard1',
        pathMatch: 'full',
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./pages/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./pages/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'tenants',
        loadChildren: () =>
          import('./pages/tenants/tenants.module').then((m) => m.TenantsModule),
      },
      {
        path: 'subscription',
        loadChildren: () =>
          import('./pages/subscription/subscription.module').then((m) => m.SubscriptionModule),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('./pages/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'staffs',
        loadChildren: () =>
          import('./pages/staffs/staffs.module').then((m) => m.StaffsModule),
      },
      {
        path: 'guardians',
        loadChildren: () =>
          import('./pages/guardians/guardians.module').then((m) => m.GuardiansModule),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import('./pages/payroll/payroll.module').then((m) => m.PayrollModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboards/dashboard1',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
