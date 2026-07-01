import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { SubscriptionServiceService } from '../../subscription.service';
import { Module, SubscriptionPlan } from '../../subscription.model';

@Component({
  selector: 'app-assign-modules-dialog',
  templateUrl: './assign-modules-dialog.component.html',
  standalone: false,
})
export class AssignModulesDialogComponent implements OnInit {
  @ViewChild('modulesList') modulesList!: MatSelectionList;

  allModules: Module[] = [];
  isLoading = true;
  preSelectedIds: Set<number>;

  constructor(
    public dialogRef: MatDialogRef<AssignModulesDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public plan: SubscriptionPlan,
    private subscriptionService: SubscriptionServiceService,
  ) {
    this.preSelectedIds = new Set((plan.modules ?? []).map((m) => m.id));
  }

  ngOnInit(): void {
    this.subscriptionService.listModules().subscribe({
      next: (res) => {
        this.allModules = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  isSelected(id: number): boolean {
    return this.preSelectedIds.has(id);
  }

  assign(): void {
    const moduleIds = this.modulesList.selectedOptions.selected.map((o) => o.value as number);
    this.dialogRef.close({ moduleIds });
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
