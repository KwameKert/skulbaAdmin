import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AppTopCardsComponent } from '../../../components/dashboard1/top-cards/top-cards.component';
import { AppFinanceTrendComponent } from '../../../components/dashboard1/finance-trend/finance-trend.component';
import { AppAuditTrendComponent } from '../../../components/dashboard1/audit-trend/audit-trend.component';
import { DashboardService } from '../dashboard.service';
import { DashboardStats } from '../dashboard.model';
import { AppReportOverviewComponent } from 'src/app/components/dashboard1/report-overview/report-overview.component';

@Component({
  selector: 'app-dashboard1',
  imports: [
    TablerIconsModule,
    AppTopCardsComponent,
    AppFinanceTrendComponent,
    AppAuditTrendComponent,
    AppReportOverviewComponent,
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component implements OnInit {
  stats: DashboardStats | null = null;
  isLoading = true;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getAllStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
