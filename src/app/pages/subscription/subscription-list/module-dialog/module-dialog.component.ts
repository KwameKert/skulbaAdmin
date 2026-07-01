import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Module, ModuleStatus } from '../../subscription.model';

@Component({
  selector: 'app-module-dialog',
  templateUrl: './module-dialog.component.html',
  standalone: false,
})
export class ModuleDialogComponent {
  action: string;
  local_data: Partial<Module>;
  statusOptions = [ModuleStatus.ACTIVE, ModuleStatus.INACTIVE];

  constructor(
    public dialogRef: MatDialogRef<ModuleDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Module & { action: string },
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
