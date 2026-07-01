import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MonthlySystemStats } from '../../../pages/dashboards/dashboard.model';

@Component({
  selector: 'app-finance-trend',
  imports: [CommonModule, NgApexchartsModule, MaterialModule, TablerIconsModule],
  templateUrl: './finance-trend.component.html',
})
export class AppFinanceTrendComponent {
  @Input() data: MonthlySystemStats[] | null | undefined = null;

  get feeTotal(): number {
    return this.data?.reduce((s, m) => s + m.totalStudentFeeTransactionAmount, 0) ?? 0;
  }

  get chartOptions() {
    const months = this.data?.map(d => d.month) ?? [];
    return {
      series: [
        { name: 'Transactions', type: 'bar',  data: this.data?.map(d => d.studentFeeTransactionsCount)     ?? [], color: '#5D87FF' },
        { name: 'Fee Amount (GHS)', type: 'line', data: this.data?.map(d => d.totalStudentFeeTransactionAmount) ?? [], color: '#FA896B' },
      ],
      chart: {
        type: 'bar' as const,
        height: 300,
        toolbar: { show: false },
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        foreColor: '#adb0bb',
      },
      plotOptions: {
        bar: { columnWidth: '40%', borderRadius: [6] as any, borderRadiusApplication: 'end' as const },
      },
      stroke: { width: [0, 3], curve: 'smooth' as const },
      xaxis: { categories: months, axisBorder: { show: false } },
      yaxis: [
        {
          title: { text: 'Transactions' },
          labels: { formatter: (v: number) => String(Math.round(v)) },
        },
        {
          opposite: true,
          title: { text: 'Amount (GHS)' },
          labels: { formatter: (v: number) => 'GHS ' + v.toLocaleString('en', { maximumFractionDigits: 0 }) },
        },
      ],
      legend: { show: true, position: 'top' as const },
      dataLabels: { enabled: false },
      grid: { borderColor: 'rgba(0,0,0,0.1)', strokeDashArray: 3 },
      tooltip: { theme: 'dark', shared: true, intersect: false, fillSeriesColor: false },
      markers: { size: [0, 4] },
    };
  }
}
