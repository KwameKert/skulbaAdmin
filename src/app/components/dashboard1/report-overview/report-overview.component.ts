import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AcademicsStats } from 'src/app/pages/dashboards/dashboard.model';

@Component({
  selector: 'app-report-overview',
  imports: [CommonModule, NgApexchartsModule, MaterialModule, TablerIconsModule],
  templateUrl: './report-overview.component.html',
})
export class AppReportOverviewComponent {
  @Input() data: AcademicsStats | null | undefined = null;

  get totals() {
    const published = this.data?.totalPublishedReports ?? 0;
    const draft = this.data?.totalDraftReports ?? 0;
    const unpublished = this.data?.totalUnpublishedReports ?? 0;
    return { published, draft, unpublished, total: published + draft + unpublished };
  }

  get chartOptions() {
    const t = this.totals;
    return {
      series: [t.published, t.draft, t.unpublished],
      chart: {
        type: 'donut' as const,
        height: 240,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        toolbar: { show: false },
      },
      labels: ['Published', 'Draft', 'Unpublished'],
      colors: ['#5D87FF', '#49BEFF', '#ECF2FF'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            background: 'transparent',
            labels: {
              show: true,
              name: { show: true, offsetY: 7 },
              value: { show: false },
              total: {
                show: true,
                color: '#2A3547',
                fontSize: '22px',
                fontWeight: '600',
                label: String(t.total),
              },
            },
          },
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: false },
      legend: { show: true, position: 'bottom' as const },
      tooltip: { theme: 'dark', fillSeriesColor: false },
    };
  }
}
