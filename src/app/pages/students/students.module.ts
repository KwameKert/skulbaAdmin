import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { StudentsRoutes } from './students.routing';
import { StudentSearchComponent } from './student-search/student-search.component';
import { StudentViewComponent } from './student-view/student-view.component';

@NgModule({
  declarations: [StudentSearchComponent, StudentViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(StudentsRoutes),
    MaterialModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class StudentsModule {}
