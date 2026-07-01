import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, IPage, Page } from '../shared/models/common.model';
import { SmsCredit, TopUpRequest, DeductRequest, RefundRequest, SmsCreditTransaction } from './sms-credit.model';

@Injectable({ providedIn: 'root' })
export class SmsCreditService {
    private apiUrl = environment.apiBaseUrl + '/billings/api/v1/sms-credits';

    constructor(private http: HttpClient) { }

    getBalance(tenantId: number): Observable<ApiResponse<SmsCredit>> {
        return this.http.get<ApiResponse<SmsCredit>>(`${this.apiUrl}/${tenantId}/balance`);
    }

    topUp(tenantId: number, request: TopUpRequest): Observable<ApiResponse<SmsCredit>> {
        return this.http.post<ApiResponse<SmsCredit>>(`${this.apiUrl}/${tenantId}/topup`, request);
    }

    deduct(tenantId: number, request: DeductRequest): Observable<ApiResponse<SmsCredit>> {
        return this.http.post<ApiResponse<SmsCredit>>(`${this.apiUrl}/${tenantId}/deduct`, request);
    }

    refund(tenantId: number, request: RefundRequest): Observable<ApiResponse<SmsCredit>> {
        return this.http.post<ApiResponse<SmsCredit>>(`${this.apiUrl}/${tenantId}/refund`, request);
    }

    getTransactions(tenantId: number, page: number = 0, size: number = 10): Observable<ApiResponse<Page<SmsCreditTransaction>>> {
        const params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<ApiResponse<Page<SmsCreditTransaction>>>(`${this.apiUrl}/${tenantId}/transactions`, { params });
    }
}
