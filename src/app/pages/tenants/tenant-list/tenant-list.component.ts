import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TenantService } from '../tenant.service';
import { Tenant } from '../tenant.model';
import { TenantDialogComponent } from './tenant-dialog/tenant-dialog.component';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  standalone: false,
})
export class TenantListComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  displayedColumns: string[] = ['#', 'name', 'tenantId', 'email', 'phone', 'status', 'action'];
  dataSource = new MatTableDataSource<Tenant>([]);
  isLoading = false;

  constructor(
    private tenantService: TenantService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadTenants();
  }

  loadTenants(): void {
    this.isLoading = true;
    this.tenantService.getTenants().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: Partial<Tenant>): void {
    const dialogRef = this.dialog.open(TenantDialogComponent, {
      data: { ...obj, action },
      width: '620px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result.event === 'Cancel') return;

      if (result.event === 'Add') {
        this.tenantService.createTenant(result.data).subscribe(() => {
          this.snackBar.open('Tenant created successfully', 'Close', { duration: 3000 });
          this.loadTenants();
        });
      } else if (result.event === 'Update') {
        this.tenantService.updateTenant(result.data.id, result.data).subscribe(() => {
          this.snackBar.open('Tenant updated successfully', 'Close', { duration: 3000 });
          this.loadTenants();
        });
      }
    });
  }
}
