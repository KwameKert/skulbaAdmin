import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceService } from '../../invoice.service';
import { TenantSubscriptionInvoiceDTO } from '../../invoice.model';

@Component({
  selector: 'app-invoice-view-dialog',
  templateUrl: './invoice-view-dialog.component.html',
  standalone: false,
})
export class InvoiceViewDialogComponent implements OnInit {
  invoice: TenantSubscriptionInvoiceDTO | null = null;
  isLoading = true;

  constructor(
    public dialogRef: MatDialogRef<InvoiceViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit(): void {
    this.invoiceService.getInvoice(this.data.id).subscribe({
      next: (res) => {
        this.invoice = res.data;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
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

  close(): void {
    this.dialogRef.close();
  }
}
