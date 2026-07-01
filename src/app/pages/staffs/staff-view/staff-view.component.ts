import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../staff.service';
import { Staff } from '../staff.model';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  standalone: false,
})
export class StaffViewComponent implements OnInit {
  staff: Staff | null = null;
  tenantId = '';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
  ) {}

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('tenantId')!;
    const staffId = +this.route.snapshot.paramMap.get('staffId')!;
    this.staffService.getStaffDetails(this.tenantId, staffId).subscribe({
      next: (res) => {
        this.staff = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getInitial(): string {
    return (this.staff?.firstName?.charAt(0) ?? '?').toUpperCase();
  }

  getStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE: { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE: { color: '#c62828', 'background-color': '#ffebee' },
    };
    return map[status] ?? { color: '#555', 'background-color': '#f0f0f0' };
  }

  goBack(): void {
    this.router.navigate(['/staffs/search']);
  }
}
