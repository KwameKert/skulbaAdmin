import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GuardianService } from '../guardian.service';
import { CrossTenantGuardianResponseDTO, Guardian } from '../guardian.model';

@Component({
  selector: 'app-guardian-search',
  templateUrl: './guardian-search.component.html',
  standalone: false,
})
export class GuardianSearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ['#', 'guardian', 'tenantId', 'relationship', 'occupation', 'status', 'action'];

  guardianList: CrossTenantGuardianResponseDTO[] = [];
  totalElements = 0;
  isLoading = false;
  currentQuery = '';
  readonly MIN_SEARCH = 3;

  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(private guardianService: GuardianService, private router: Router) {}

  ngOnInit(): void {
    this.searchSub = this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query) => {
        this.currentQuery = query;
        this.paginator.firstPage();
        if (query.length >= this.MIN_SEARCH) {
          this.doSearch(query, 0, this.paginator.pageSize || 10);
        } else {
          this.guardianList = [];
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

  viewGuardian(tenantId: string, guardianId: number | undefined): void {
    this.router.navigate(['/guardians/view', tenantId, guardianId]);
  }

  private doSearch(query: string, page: number, size: number): void {
    this.isLoading = true;
    this.guardianService.searchGuardians(query, page, size).subscribe({
      next: (res) => {
        this.guardianList = res.data.content;
        this.totalElements = res.data.page.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getInitial(guardian: Guardian): string {
    return (guardian.firstName?.charAt(0) ?? '?').toUpperCase();
  }

  getStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE: { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE: { color: '#c62828', 'background-color': '#ffebee' },
    };
    return map[status] ?? { color: '#555', 'background-color': '#f0f0f0' };
  }
}
