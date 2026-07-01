import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubscriptionServiceService } from '../subscription.service';
import { Module, SubscriptionPlan, SubscriptionPlanDTO } from '../subscription.model';
import { PlanDialogComponent } from './plan-dialog/plan-dialog.component';
import { ModuleDialogComponent } from './module-dialog/module-dialog.component';
import { AssignModulesDialogComponent } from './assign-modules-dialog/assign-modules-dialog.component';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  standalone: false,
})
export class SubscriptionListComponent implements AfterViewInit {
  @ViewChild('plansPaginator') plansPaginator!: MatPaginator;
  @ViewChild('modulesPaginator') modulesPaginator!: MatPaginator;

  planColumns: string[] = ['#', 'name', 'code', 'price', 'status', 'modules', 'action'];
  moduleColumns: string[] = ['#', 'name', 'code', 'description', 'status', 'action'];

  plansDataSource = new MatTableDataSource<SubscriptionPlan>([]);
  modulesDataSource = new MatTableDataSource<Module>([]);

  plansLoading = false;
  modulesLoading = false;

  constructor(
    private subscriptionService: SubscriptionServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngAfterViewInit(): void {
    this.plansDataSource.paginator = this.plansPaginator;
    this.modulesDataSource.paginator = this.modulesPaginator;
    this.loadPlans();
    this.loadModules();
  }

  loadPlans(): void {
    this.plansLoading = true;
    this.subscriptionService.listSubscription().subscribe({
      next: (res) => {
        this.plansDataSource.data = res.data;
        this.plansLoading = false;
      },
      error: () => { this.plansLoading = false; },
    });
  }

  loadModules(): void {
    this.modulesLoading = true;
    this.subscriptionService.listModules().subscribe({
      next: (res) => {
        this.modulesDataSource.data = res.data;
        this.modulesLoading = false;
      },
      error: () => { this.modulesLoading = false; },
    });
  }

  applyPlanFilter(value: string): void {
    this.plansDataSource.filter = value.trim().toLowerCase();
  }

  applyModuleFilter(value: string): void {
    this.modulesDataSource.filter = value.trim().toLowerCase();
  }

  getStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE:    { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE:  { color: '#f57c00', 'background-color': '#fff3e0' },
      CANCELLED: { color: '#c62828', 'background-color': '#ffebee' },
      EXPIRED:   { color: '#6a1b9a', 'background-color': '#f3e5f5' },
      DELETED:   { color: '#757575', 'background-color': '#f5f5f5' },
    };
    return map[status] ?? { color: '#757575', 'background-color': '#f5f5f5' };
  }

  openPlanDialog(action: string, obj: Partial<SubscriptionPlan>): void {
    const dialogRef = this.dialog.open(PlanDialogComponent, {
      data: { ...obj, action },
      width: '620px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result.event === 'Cancel') return;
      const dto: SubscriptionPlanDTO = {
        name: result.data.name,
        description: result.data.description ?? '',
        code: result.data.code,
        price: +result.data.price,
        status: result.data.status,
      };
      if (result.event === 'Add') {
        this.subscriptionService.createSubscription(dto).subscribe(() => {
          this.snackBar.open('Plan created successfully', 'Close', { duration: 3000 });
          this.loadPlans();
        });
      } else if (result.event === 'Update') {
        this.subscriptionService.updateSubscription(+result.data.id, dto).subscribe(() => {
          this.snackBar.open('Plan updated successfully', 'Close', { duration: 3000 });
          this.loadPlans();
        });
      }
    });
  }

  openModuleDialog(action: string, obj: Partial<Module>): void {
    const dialogRef = this.dialog.open(ModuleDialogComponent, {
      data: { ...obj, action },
      width: '560px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result.event === 'Cancel') return;
      if (result.event === 'Add') {
        this.subscriptionService.createModules(result.data).subscribe(() => {
          this.snackBar.open('Module created successfully', 'Close', { duration: 3000 });
          this.loadModules();
        });
      } else if (result.event === 'Update') {
        this.subscriptionService.updateModules(result.data.id, result.data).subscribe(() => {
          this.snackBar.open('Module updated successfully', 'Close', { duration: 3000 });
          this.loadModules();
        });
      }
    });
  }

  openAssignDialog(plan: SubscriptionPlan): void {
    const dialogRef = this.dialog.open(AssignModulesDialogComponent, {
      data: plan,
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.subscriptionService.assignModulesToSubscription({
        subscriptionId: plan.id,
        moduleIds: result.moduleIds,
      }).subscribe(() => {
        this.snackBar.open('Modules assigned successfully', 'Close', { duration: 3000 });
        this.loadPlans();
      });
    });
  }
}
