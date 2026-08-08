import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceService } from '../invoice.service';
import { TenantSubscriptionInvoiceDTO, TenantSubscriptionInvoiceStatus } from '../invoice.model';
import { GenerateInvoiceDialogComponent } from './generate-invoice-dialog/generate-invoice-dialog.component';
import { InvoiceViewDialogComponent } from './invoice-view-dialog/invoice-view-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  standalone: false,
})
export class InvoiceListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = [
    '#', 'invoiceNumber', 'tenantName', 'period', 'enrolledStudentCount',
    'pricePerStudent', 'amount', 'status', 'generatedAt', 'sentAt', 'action',
  ];

  records: TenantSubscriptionInvoiceDTO[] = [];
  totalElements = 0;
  isLoading = false;
  isGenerating = false;

  statusFilter: TenantSubscriptionInvoiceStatus | null = null;
  statusOptions = Object.values(TenantSubscriptionInvoiceStatus);

  constructor(
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(page = 0, size = 10): void {
    this.isLoading = true;
    this.invoiceService.getInvoices(this.statusFilter, page, size).subscribe({
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

  onStatusFilterChange(): void {
    this.paginator.firstPage();
    this.loadRecords(0, this.paginator.pageSize);
  }

  openGenerateDialog(): void {
    const dialogRef = this.dialog.open(GenerateInvoiceDialogComponent, { width: '480px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result.event === 'Cancel') return;

      this.isGenerating = true;
      this.invoiceService.generate(result.data.tenantId).subscribe({
        next: () => {
          this.isGenerating = false;
          this.snackBar.open('Invoice generated', 'Close', { duration: 3000 });
          this.loadRecords();
        },
        error: (err) => {
          this.isGenerating = false;
          this.snackBar.open(err?.error?.message ?? 'Failed to generate invoice', 'Close', { duration: 4000 });
        },
      });
    });
  }

  sendInvoice(row: TenantSubscriptionInvoiceDTO): void {
    this.invoiceService.send(row.id).subscribe({
      next: () => {
        this.snackBar.open('Invoice sent', 'Close', { duration: 3000 });
        this.loadRecords(this.paginator.pageIndex, this.paginator.pageSize);
      },
      error: (err) => {
        this.snackBar.open(err?.error?.message ?? 'Failed to send invoice', 'Close', { duration: 4000 });
      },
    });
  }

  voidInvoice(row: TenantSubscriptionInvoiceDTO): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Void Invoice',
        message: `Void invoice ${row.invoiceNumber}? This action cannot be undone.`,
        confirmText: 'Void',
        isDestructive: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.invoiceService.voidInvoice(row.id).subscribe({
        next: () => {
          this.snackBar.open('Invoice voided', 'Close', { duration: 3000 });
          this.loadRecords(this.paginator.pageIndex, this.paginator.pageSize);
        },
        error: (err) => {
          this.snackBar.open(err?.error?.message ?? 'Failed to void invoice', 'Close', { duration: 4000 });
          this.loadRecords(this.paginator.pageIndex, this.paginator.pageSize);
        },
      });
    });
  }

  openViewDialog(row: TenantSubscriptionInvoiceDTO): void {
    this.dialog.open(InvoiceViewDialogComponent, {
      width: '560px',
      data: { id: row.id },
    });
  }

  getStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      DRAFT: { color: '#757575', 'background-color': '#f5f5f5' },
      SENT: { color: '#00796b', 'background-color': '#e0f7fa' },
      VOID: { color: '#c62828', 'background-color': '#ffebee' },
    };
    return map[status] ?? { color: '#757575', 'background-color': '#f5f5f5' };
  }
}
