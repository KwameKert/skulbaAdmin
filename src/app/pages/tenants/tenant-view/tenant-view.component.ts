import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TenantService } from '../tenant.service';
import { TenantDetailsDTO, TenantSubscriptionDTO } from '../tenant.model';
import { SmsCreditService } from '../sms-credit.service';
import { SmsCredit, SmsCreditTransaction } from '../sms-credit.model';
import { SubscriptionServiceService } from '../../subscription/subscription.service';
import { SubscriptionPlan } from '../../subscription/subscription.model';

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

  plans: SubscriptionPlan[] = [];
  showAssignForm = false;
  isAssignSubmitting = false;
  assign = this.blankAssignForm();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tenantService: TenantService,
    private smsCreditService: SmsCreditService,
    private subscriptionService: SubscriptionServiceService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.tenantNumericId = id;
    this.loadTenant();
    this.loadPlans();
    this.loadSmsBalance();
    this.loadTransactions();
  }

  loadTenant(): void {
    this.tenantService.getTenant(this.tenantNumericId).subscribe({
      next: (res) => {
        this.tenantDetail = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  loadPlans(): void {
    this.subscriptionService.listSubscription().subscribe({
      next: (res) => {
        this.plans = res.data;
      },
      error: () => { },
    });
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
      error: () => { },
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

  blankAssignForm() {
    return {
      subscriptionPlanID: 0 as number | string,
      trialStartsAt: null as Date | null,
      trialEndsAt: null as Date | null,
      subscriptionStartsAt: null as Date | null,
      subscriptionEndsAt: null as Date | null,
      nextBillingDate: null as Date | null,
    };
  }

  private toDate(value: string | null | undefined): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }


  openAssignForm(): void {
    const d = this.tenantDetail;
    this.assign = {
      subscriptionPlanID: d?.subscriptionPlanID ?? 0,
      trialStartsAt: this.toDate(d?.trialStartsAt),
      trialEndsAt: this.toDate(d?.trialEndsAt),
      subscriptionStartsAt: this.toDate(d?.subscriptionStartsAt),
      subscriptionEndsAt: this.toDate(d?.subscriptionEndsAt),
      nextBillingDate: this.toDate(d?.nextBillingDate),
    };
    this.showAssignForm = true;
  }

  cancelAssign(): void {
    this.showAssignForm = false;
  }

  submitAssign(): void {
    const a = this.assign;
    if (!a.subscriptionPlanID || !a.subscriptionStartsAt || !a.subscriptionEndsAt || !a.nextBillingDate) {
      return;
    }
    this.isAssignSubmitting = true;

    const payload: TenantSubscriptionDTO = {
      tenantId: this.tenantNumericId,
      subscriptionPlanID: Number(a.subscriptionPlanID),
      subscriptionStartsAt: a.subscriptionStartsAt,
      subscriptionEndsAt: a.subscriptionEndsAt,
      nextBillingDate: a.nextBillingDate,
      status: 'ACTIVE',
    };

    if (a.trialStartsAt) payload.trialStartsAt = a.trialStartsAt;
    if (a.trialEndsAt) payload.trialEndsAt = a.trialEndsAt;

    this.tenantService.assignSubscriptionPlan(payload).subscribe({
      next: () => {
        this.isAssignSubmitting = false;
        this.showAssignForm = false;
        this.snackBar.open('Subscription plan assigned', 'Close', { duration: 3000 });
        this.loadTenant();
      },
      error: () => {
        this.isAssignSubmitting = false;
        this.snackBar.open('Failed to assign subscription plan', 'Close', { duration: 4000 });
      },
    });
  }

  getStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE: { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE: { color: '#c62828', 'background-color': '#ffebee' },
    };
    return map[status] ?? { color: '#757575', 'background-color': '#f5f5f5' };
  }

  getSubStatusStyle(status: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE: { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE: { color: '#f57c00', 'background-color': '#fff3e0' },
      CANCELLED: { color: '#c62828', 'background-color': '#ffebee' },
      EXPIRED: { color: '#6a1b9a', 'background-color': '#f3e5f5' },
    };
    return map[status] ?? { color: '#757575', 'background-color': '#f5f5f5' };
  }

  getTransactionTypeStyle(type: string): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      TOPUP: { color: '#00796b', 'background-color': '#e0f7fa' },
      DEDUCTION: { color: '#e65100', 'background-color': '#fff3e0' },
      REFUND: { color: '#1565c0', 'background-color': '#e3f2fd' },
    };
    return map[type] ?? { color: '#555', 'background-color': '#f0f0f0' };
  }

  goBack(): void {
    this.router.navigate(['/tenants/list']);
  }
}
