import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { TenantsRoutes } from './tenants.routing';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantDialogComponent } from './tenant-list/tenant-dialog/tenant-dialog.component';
import { TenantViewComponent } from './tenant-view/tenant-view.component';

@NgModule({
  declarations: [TenantListComponent, TenantDialogComponent, TenantViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TenantsRoutes),
    MaterialModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class TenantsModule {}
