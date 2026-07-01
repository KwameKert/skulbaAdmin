import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tenant } from '../../tenant.model';

@Component({
  selector: 'app-tenant-dialog',
  templateUrl: './tenant-dialog.component.html',
  standalone: false,
})
export class TenantDialogComponent {
  action: string;
  local_data: Partial<Tenant>;
  statusOptions = ['ACTIVE', 'INACTIVE'];

  constructor(
    public dialogRef: MatDialogRef<TenantDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Tenant & { action: string },
  ) {
    this.local_data = { ...data };
    this.action = this.local_data['action' as keyof typeof this.local_data] as string;
    delete (this.local_data as any)['action'];
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
