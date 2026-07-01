import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayrollStatutoryConfig } from '../../payroll.model';

@Component({
  selector: 'app-statutory-dialog',
  templateUrl: './statutory-dialog.component.html',
  standalone: false,
})
export class StatutoryDialogComponent {
  action: string;
  local_data: Partial<PayrollStatutoryConfig>;

  constructor(
    public dialogRef: MatDialogRef<StatutoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA)
    public data: PayrollStatutoryConfig & { action: string },
  ) {
    this.local_data = { ...data };
    this.action = (this.local_data as any)['action'];
    delete (this.local_data as any)['action'];

    // Normalize ISO datetimes to YYYY-MM-DD for the native date input
    if (this.local_data.effectiveFrom) {
      this.local_data.effectiveFrom = this.local_data.effectiveFrom.substring(0, 10);
    }
    if (this.local_data.effectiveTo) {
      this.local_data.effectiveTo = this.local_data.effectiveTo.substring(0, 10);
    }
  }

  doAction(): void {
    this.dialogRef.close({
      event: this.action,
      data: {
        ...this.local_data,
        effectiveTo: this.local_data.effectiveTo || null,
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
