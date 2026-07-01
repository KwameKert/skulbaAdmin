import { Routes } from '@angular/router';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';

export const SubscriptionRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: SubscriptionListComponent,
    data: {
      title: 'Subscriptions',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Subscriptions' },
      ],
    },
  },
];
