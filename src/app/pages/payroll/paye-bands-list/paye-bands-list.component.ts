import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayrollConfigService } from '../payroll-config.service';
import { PayrollPayeBand } from '../payroll.model';
import { PayeBandDialogComponent } from './paye-band-dialog/paye-band-dialog.component';

@Component({
  selector: 'app-paye-bands-list',
  templateUrl: './paye-bands-list.component.html',
  standalone: false,
})
export class PayeBandsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = [
    '#', 'lowerBound', 'higherBound', 'rate', 'effectiveFrom', 'effectiveTo', 'action',
  ];

  bands: PayrollPayeBand[] = [];
  totalElements = 0;
  isLoading = false;

  constructor(
    private payrollService: PayrollConfigService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadBands();
  }

  loadBands(page = 0, size = 10): void {
    this.isLoading = true;
    this.payrollService.getPayeBands(page, size).subscribe({
      next: (res) => {
        this.bands = res.data.content;
        this.totalElements = res.data.page.totalElements;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  onPageChange(event: PageEvent): void {
    this.loadBands(event.pageIndex, event.pageSize);
  }

  openDialog(action: string, obj: Partial<PayrollPayeBand>): void {
    const dialogRef = this.dialog.open(PayeBandDialogComponent, {
      data: { ...obj, action },
      width: '620px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result.event === 'Cancel') return;

      const payload = {
        ...result.data,
        lowerBound: +result.data.lowerBound,
        higherBound: +result.data.higherBound,
        rate: +result.data.rate,
      };

      if (result.event === 'Add') {
        this.payrollService.createPayeBand(payload).subscribe(() => {
          this.snackBar.open('PAYE band created', 'Close', { duration: 3000 });
          this.loadBands();
        });
      } else if (result.event === 'Update') {
        this.payrollService.updatePayeBand(result.data.id, payload).subscribe(() => {
          this.snackBar.open('PAYE band updated', 'Close', { duration: 3000 });
          this.loadBands();
        });
      }
    });
  }
}
