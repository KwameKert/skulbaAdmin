import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../shared/models/common.model';
import { AcademicsStats, DashboardStats, FinanceStats, UserStats } from './dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private usersUrl = environment.apiBaseUrl + '/users/api/v1/tenants/system/dashboard';
  private academicsUrl = environment.apiBaseUrl + '/academics/api/v1/system/stats';
  private billingUrl = environment.apiBaseUrl + '/billings/api/v1/system/stats';

  constructor(private http: HttpClient) { }

  getUserDashboard(): Observable<ApiResponse<UserStats>> {
    return this.http.get<ApiResponse<UserStats>>(this.usersUrl);
  }

  getAcademicsStats(): Observable<ApiResponse<AcademicsStats>> {
    return this.http.get<ApiResponse<AcademicsStats>>(this.academicsUrl);
  }

  getBillingStats(): Observable<ApiResponse<FinanceStats>> {
    return this.http.get<ApiResponse<FinanceStats>>(this.billingUrl);
  }

  getAllStats(): Observable<DashboardStats> {
    return forkJoin({
      users: this.getUserDashboard().pipe(map(r => r.data)),
      academics: this.getAcademicsStats().pipe(map(r => r.data)),
      billing: this.getBillingStats().pipe(map(r => r.data)),
    });
  }
}
