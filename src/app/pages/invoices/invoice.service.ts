import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Page } from '../shared/models/common.model';
import { environment } from 'src/environments/environment';
import { TenantSubscriptionInvoiceDTO, TenantSubscriptionInvoiceStatus } from './invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
    private baseUrl = environment.apiBaseUrl + '/billings/api/v1/admin/tenant-billing/invoices';

    constructor(private http: HttpClient) { }

    generate(tenantId: number): Observable<ApiResponse<TenantSubscriptionInvoiceDTO>> {
        return this.http.post<ApiResponse<TenantSubscriptionInvoiceDTO>>(`${this.baseUrl}/generate`, { tenantId });
    }

    getInvoices(
        status: TenantSubscriptionInvoiceStatus | null,
        page = 0,
        size = 10,
        sort = 'generatedAt,desc',
    ): Observable<ApiResponse<Page<TenantSubscriptionInvoiceDTO>>> {
        const params: Record<string, string | number> = { page, size, sort };
        if (status) {
            params['status'] = status;
        }
        return this.http.get<ApiResponse<Page<TenantSubscriptionInvoiceDTO>>>(this.baseUrl, { params });
    }

    getInvoice(id: number): Observable<ApiResponse<TenantSubscriptionInvoiceDTO>> {
        return this.http.get<ApiResponse<TenantSubscriptionInvoiceDTO>>(`${this.baseUrl}/${id}`);
    }

    send(id: number): Observable<ApiResponse<TenantSubscriptionInvoiceDTO>> {
        return this.http.patch<ApiResponse<TenantSubscriptionInvoiceDTO>>(`${this.baseUrl}/${id}/send`, {});
    }

    voidInvoice(id: number): Observable<ApiResponse<TenantSubscriptionInvoiceDTO>> {
        return this.http.patch<ApiResponse<TenantSubscriptionInvoiceDTO>>(`${this.baseUrl}/${id}/void`, {});
    }
}
