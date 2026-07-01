import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StaffService } from '../staff.service';
import { CrossTenantStaffResponseDTO, Staff } from '../staff.model';

@Component({
  selector: 'app-staff-search',
  templateUrl: './staff-search.component.html',
  standalone: false,
})
export class StaffSearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ['#', 'staff', 'tenantId', 'employeeCode', 'employeeType', 'gender', 'status', 'action'];

  staffList: CrossTenantStaffResponseDTO[] = [];
  totalElements = 0;
  isLoading = false;
  currentQuery = '';
  readonly MIN_SEARCH = 3;

  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(private staffService: StaffService, private router: Router) {}

  ngOnInit(): void {
    this.searchSub = this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query) => {
        this.currentQuery = query;
        this.paginator.firstPage();
        if (query.length >= this.MIN_SEARCH) {
          this.doSearch(query, 0, this.paginator.pageSize || 10);
        } else {
          this.staffList = [];
          this.totalElements = 0;
        }
      });
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  onInput(value: string): void {
    this.searchSubject.next(value);
  }

  onPageChange(event: PageEvent): void {
    if (this.currentQuery.length >= this.MIN_SEARCH) {
      this.doSearch(this.currentQuery, event.pageIndex, event.pageSize);
    }
  }

  viewStaff(tenantId: string, staffId: number): void {
    this.router.navigate(['/staffs/view', tenantId, staffId]);
  }

  private doSearch(query: string, page: number, size: number): void {
    this.isLoading = true;
    this.staffService.searchStaff(query, page, size).subscribe({
      next: (res) => {
        this.staffList = res.data.content;
        this.totalElements = res.data.page.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getInitial(staff: Staff): string {
    return (staff.firstName?.charAt(0) ?? '?').toUpperCase();
  }

  getStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE: { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE: { color: '#c62828', 'background-color': '#ffebee' },
    };
    return map[status] ?? { color: '#555', 'background-color': '#f0f0f0' };
  }
}
