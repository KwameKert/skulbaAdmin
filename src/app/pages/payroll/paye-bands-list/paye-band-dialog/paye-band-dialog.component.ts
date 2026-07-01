import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayrollPayeBand } from '../../payroll.model';

@Component({
  selector: 'app-paye-band-dialog',
  templateUrl: './paye-band-dialog.component.html',
  standalone: false,
})
export class PayeBandDialogComponent {
  action: string;
  local_data: Partial<PayrollPayeBand>;

  constructor(
    public dialogRef: MatDialogRef<PayeBandDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA)
    public data: PayrollPayeBand & { action: string },
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
