import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MonthlyAuditLog } from '../../../pages/dashboards/dashboard.model';

@Component({
  selector: 'app-audit-trend',
  imports: [CommonModule, NgApexchartsModule, MaterialModule, TablerIconsModule],
  templateUrl: './audit-trend.component.html',
})
export class AppAuditTrendComponent {
  @Input() data: MonthlyAuditLog[] | null | undefined = null;
  @Input() total: number | null | undefined = null;

  get lastMonth(): MonthlyAuditLog | null {
    return this.data?.length ? this.data[this.data.length - 1] : null;
  }

  get chartOptions() {
    return {
      series: [{ name: 'Audit Logs', color: '#5D87FF', data: this.data?.map(d => d.count) ?? [] }],
      chart: {
        type: 'area' as const,
        height: 130,
        sparkline: { enabled: true },
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        toolbar: { show: false },
        foreColor: '#adb0bb',
      },
      stroke: { curve: 'smooth' as const, width: 2 },
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 0, inverseColors: false, opacityFrom: 0.45, opacityTo: 0, stops: [20, 180] },
      },
      markers: { size: 0 },
      tooltip: {
        theme: 'dark',
        x: {
          show: true,
          formatter: (val: number) => this.data?.[val - 1]?.month ?? '',
        },
      },
    };
  }
}
