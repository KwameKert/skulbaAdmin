import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayrollConfigService } from '../payroll-config.service';
import { PayrollStatutoryConfig } from '../payroll.model';
import { StatutoryDialogComponent } from './statutory-dialog/statutory-dialog.component';

@Component({
  selector: 'app-statutory-list',
  templateUrl: './statutory-list.component.html',
  standalone: false,
})
export class StatutoryListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = [
    '#', 'configKey', 'configValue', 'effectiveFrom', 'effectiveTo', 'action',
  ];

  records: PayrollStatutoryConfig[] = [];
  totalElements = 0;
  isLoading = false;

  constructor(
    private payrollService: PayrollConfigService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(page = 0, size = 10): void {
    this.isLoading = true;
    this.payrollService.getStatutory(page, size).subscribe({
      next: (res) => {
        this.records = res.data.content;
        this.totalElements = res.data.page.totalElements;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  onPageChange(event: PageEvent): void {
    this.loadRecords(event.pageIndex, event.pageSize);
  }

  openDialog(action: string, obj: Partial<PayrollStatutoryConfig>): void {
    const dialogRef = this.dialog.open(StatutoryDialogComponent, {
      data: { ...obj, action },
      width: '620px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result.event === 'Cancel') return;

      if (result.event === 'Add') {
        this.payrollService.createStatutory(result.data).subscribe(() => {
          this.snackBar.open('Statutory config created', 'Close', { duration: 3000 });
          this.loadRecords();
        });
      } else if (result.event === 'Update') {
        this.payrollService.updateStatutory(result.data.id, result.data).subscribe(() => {
          this.snackBar.open('Statutory config updated', 'Close', { duration: 3000 });
          this.loadRecords();
        });
      }
    });
  }
}
