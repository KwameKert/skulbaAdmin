import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { DashboardsRoutes } from './dashboards.routing';

import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';

@NgModule({
  imports: [
    RouterModule.forChild(DashboardsRoutes),
    AppDashboard1Component,
    AppDashboard2Component,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class DashboardsModule {}
