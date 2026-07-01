import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from '../guardian.service';
import { Guardian } from '../guardian.model';

@Component({
  selector: 'app-guardian-view',
  templateUrl: './guardian-view.component.html',
  standalone: false,
})
export class GuardianViewComponent implements OnInit {
  guardian: Guardian | null = null;
  tenantId = '';
  isLoading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guardianService: GuardianService,
  ) {}

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('tenantId')!;
    const guardianId = +this.route.snapshot.paramMap.get('guardianId')!;
    this.guardianService.getGuardianDetails(this.tenantId, guardianId).subscribe({
      next: (res) => {
        this.guardian = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.error = true;
        this.isLoading = false;
      },
    });
  }

  getInitial(): string {
    return (this.guardian?.firstName?.charAt(0) ?? '?').toUpperCase();
  }

  getStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE: { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE: { color: '#c62828', 'background-color': '#ffebee' },
    };
    return map[status] ?? { color: '#555', 'background-color': '#f0f0f0' };
  }

  goBack(): void {
    this.router.navigate(['/guardians/search']);
  }
}
