import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { DashboardStats } from '../../../pages/dashboards/dashboard.model';

interface StatCard {
  label: string;
  value: number | null;
  icon: string;
  color: string;
  currency?: boolean;
}

@Component({
  selector: 'app-top-cards',
  imports: [CommonModule, MaterialModule, TablerIconsModule],
  templateUrl: './top-cards.component.html',
})
export class AppTopCardsComponent {
  @Input() stats: DashboardStats | null = null;
  @Input() isLoading = false;

  get allCards(): StatCard[] {
    const u = this.stats?.users;
    const a = this.stats?.academics;
    const b = this.stats?.billing;
    const ms = b?.monthlyStats ?? [];
    return [
      { label: 'Schools', value: u?.totalTenants ?? null, icon: 'building', color: 'primary' },
      { label: 'Students', value: u?.totalStudents ?? null, icon: 'user-search', color: 'warning' },
      // { label: 'Guardians', value: u?.totalGuardians ?? null, icon: 'users', color: 'accent' },
      { label: 'Staff', value: u?.totalStaff ?? null, icon: 'id-badge-2', color: 'success' },
      // { label: 'Audit Logs', value: u?.totalAuditLogs ?? null, icon: 'file-text', color: 'error' },
      { label: 'Active Enrolled', value: a?.totalActiveEnrolledStudents ?? null, icon: 'school', color: 'primary' },
      // { label: 'Classes', value: a?.totalClasses ?? null, icon: 'chalkboard', color: 'warning' },
      // { label: 'Courses', value: a?.totalCourses ?? null, icon: 'books', color: 'accent' },
      { label: 'Active Courses', value: a?.totalActiveClassCourses ?? null, icon: 'calendar-check', color: 'success' },
      // { label: 'Notifications', value: a?.totalOutboxNotifications ?? null, icon: 'send', color: 'error' },
      { label: 'Invoices', value: b?.invoicesGeneratedCount ?? null, icon: 'receipt-2', color: 'primary' },

    ];
  }

}
