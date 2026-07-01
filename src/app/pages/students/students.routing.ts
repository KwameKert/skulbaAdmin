import { Routes } from '@angular/router';
import { StudentSearchComponent } from './student-search/student-search.component';
import { StudentViewComponent } from './student-view/student-view.component';

export const StudentsRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  {
    path: 'search',
    component: StudentSearchComponent,
    data: {
      title: 'Student Search',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Student Search' },
      ],
    },
  },
  {
    path: 'view/:tenantId/:studentId',
    component: StudentViewComponent,
    data: {
      title: 'Student Details',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Student Search', url: '/students/search' },
        { title: 'Student Details' },
      ],
    },
  },
];
