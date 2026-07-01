import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { StaffsRoutes } from './staffs.routing';
import { StaffSearchComponent } from './staff-search/staff-search.component';
import { StaffViewComponent } from './staff-view/staff-view.component';

@NgModule({
  declarations: [StaffSearchComponent, StaffViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(StaffsRoutes),
    MaterialModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class StaffsModule {}
