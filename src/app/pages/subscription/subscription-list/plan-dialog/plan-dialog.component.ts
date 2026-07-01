import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionPlan, SubscriptionStatus } from '../../subscription.model';

@Component({
  selector: 'app-plan-dialog',
  templateUrl: './plan-dialog.component.html',
  standalone: false,
})
export class PlanDialogComponent {
  action: string;
  local_data: Partial<SubscriptionPlan>;
  statusOptions = Object.values(SubscriptionStatus).filter(s => s !== SubscriptionStatus.DELETED);

  constructor(
    public dialogRef: MatDialogRef<PlanDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: SubscriptionPlan & { action: string },
  ) {
    this.local_data = { ...data };
    this.action = (this.local_data as any)['action'];
    delete (this.local_data as any)['action'];
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
