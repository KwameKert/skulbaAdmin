import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { GuardiansRoutes } from './guardians.routing';
import { GuardianSearchComponent } from './guardian-search/guardian-search.component';
import { GuardianViewComponent } from './guardian-view/guardian-view.component';

@NgModule({
  declarations: [GuardianSearchComponent, GuardianViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(GuardiansRoutes),
    MaterialModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class GuardiansModule {}
