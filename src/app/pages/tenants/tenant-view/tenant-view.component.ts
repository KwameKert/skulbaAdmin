import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../tenant.service';
import { TenantDetailsDTO } from '../tenant.model';
import { SmsCreditService } from '../sms-credit.service';
import { SmsCredit, SmsCreditTransaction } from '../sms-credit.model';

@Component({
  selector: 'app-tenant-view',
  templateUrl: './tenant-view.component.html',
  standalone: false,
})
export class TenantViewComponent implements OnInit {
  tenantDetail: TenantDetailsDTO | null = null;
  isLoading = true;

  tenantNumericId = 0;
  smsCredit: SmsCredit | null = null;
  isSmsLoading = false;
  transactions: SmsCreditTransaction[] = [];
  transactionColumns = ['type', 'amount', 'reference', 'createdBy', 'createdAt'];
  activeAction: 'topup' | 'deduct' | null = null;
  actionAmount: number | null = null;
  actionReference = '';
  actionCreatedBy = '';
  isActionSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tenantService: TenantService,
    private smsCreditService: SmsCreditService,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.tenantNumericId = id;
    this.tenantService.getTenant(id).subscribe({
      next: (res) => {
        this.tenantDetail = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
    this.loadSmsBalance();
    this.loadTransactions();
  }

  loadSmsBalance(): void {
    this.isSmsLoading = true;
    this.smsCreditService.getBalance(this.tenantNumericId).subscribe({
      next: (res) => {
        this.smsCredit = res.data;
        this.isSmsLoading = false;
      },
      error: () => {
        this.isSmsLoading = false;
      },
    });
  }

  loadTransactions(): void {
    this.smsCreditService.getTransactions(this.tenantNumericId, 0, 5).subscribe({
      next: (res) => {
        this.transactions = res.data.content;
      },
      error: () => {},
    });
  }

  openAction(type: 'topup' | 'deduct'): void {
    this.activeAction = type;
    this.actionAmount = null;
    this.actionReference = '';
    this.actionCreatedBy = '';
  }

  cancelAction(): void {
    this.activeAction = null;
  }

  submitAction(): void {
    if (!this.actionAmount || !this.actionReference) return;
    this.isActionSubmitting = true;

    const done = () => {
      this.isActionSubmitting = false;
      this.cancelAction();
      this.loadSmsBalance();
      this.loadTransactions();
    };
    const fail = () => {
      this.isActionSubmitting = false;
    };

    if (this.activeAction === 'topup') {
      this.smsCreditService.topUp(this.tenantNumericId, {
        amount: this.actionAmount,
        reference: this.actionReference,
        createdBy: this.actionCreatedBy,
      }).subscribe({ next: done, error: fail });
    } else {
      this.smsCreditService.deduct(this.tenantNumericId, {
        amount: this.actionAmount,
        reference: this.actionReference,
      }).subscribe({ next: done, error: fail });
    }
  }

  getStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE:   { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE: { color: '#c62828', 'background-color': '#ffebee' },
    };
    return map[status] ?? { color: '#757575', 'background-color': '#f5f5f5' };
  }

  getSubStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE:    { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE:  { color: '#f57c00', 'background-color': '#fff3e0' },
      CANCELLED: { color: '#c62828', 'background-color': '#ffebee' },
      EXPIRED:   { color: '#6a1b9a', 'background-color': '#f3e5f5' },
    };
    return map[status] ?? { color: '#757575', 'background-color': '#f5f5f5' };
  }

  getTransactionTypeStyle(type: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      TOPUP:     { color: '#00796b', 'background-color': '#e0f7fa' },
      DEDUCTION: { color: '#e65100', 'background-color': '#fff3e0' },
      REFUND:    { color: '#1565c0', 'background-color': '#e3f2fd' },
    };
    return map[type] ?? { color: '#555', 'background-color': '#f0f0f0' };
  }

  goBack(): void {
    this.router.navigate(['/tenants/list']);
  }
}
