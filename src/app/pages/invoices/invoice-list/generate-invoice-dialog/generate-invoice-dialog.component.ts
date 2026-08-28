import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../../../tenants/tenant.service';
import { Tenant } from '../../../tenants/tenant.model';

@Component({
  selector: 'app-generate-invoice-dialog',
  templateUrl: './generate-invoice-dialog.component.html',
  standalone: false,
})
export class GenerateInvoiceDialogComponent implements OnInit {
  tenants: Tenant[] = [];
  isLoading = false;
  selectedTenantId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<GenerateInvoiceDialogComponent>,
    private tenantService: TenantService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.tenantService.getTenants().subscribe({
      next: (res) => {
        this.tenants = res.data;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  doAction(): void {
    this.dialogRef.close({ event: 'Generate', data: { tenantId: this.selectedTenantId } });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
