import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { SubscriptionRoutes } from './subscription.routing';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { PlanDialogComponent } from './subscription-list/plan-dialog/plan-dialog.component';
import { ModuleDialogComponent } from './subscription-list/module-dialog/module-dialog.component';
import { AssignModulesDialogComponent } from './subscription-list/assign-modules-dialog/assign-modules-dialog.component';

@NgModule({
  declarations: [
    SubscriptionListComponent,
    PlanDialogComponent,
    ModuleDialogComponent,
    AssignModulesDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SubscriptionRoutes),
    MaterialModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class SubscriptionModule {}
