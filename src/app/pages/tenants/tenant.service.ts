import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../shared/models/common.model';
import { Tenant, TenantDetailsDTO } from './tenant.model';

@Injectable({ providedIn: 'root' })
export class TenantService {
    private apiUrl = environment.apiBaseUrl + '/users/api/v1/tenants';

    constructor(private http: HttpClient) { }

    getTenants(): Observable<ApiResponse<Tenant[]>> {
        return this.http.get<ApiResponse<Tenant[]>>(this.apiUrl);
    }

    getTenant(id: number): Observable<ApiResponse<TenantDetailsDTO>> {
        return this.http.get<ApiResponse<TenantDetailsDTO>>(`${this.apiUrl}/${id}`);
    }

    createTenant(tenant: Tenant): Observable<ApiResponse<Tenant>> {
        return this.http.post<ApiResponse<Tenant>>(this.apiUrl, tenant);
    }

    updateTenant(id: number, tenant: Tenant): Observable<ApiResponse<Tenant>> {
        return this.http.put<ApiResponse<Tenant>>(`${this.apiUrl}/${id}`, tenant);
    }

    deleteTenant(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    assignSubscriptionPlan(data: TenantDetailsDTO): Observable<ApiResponse<TenantDetailsDTO>> {
        return this.http.post<ApiResponse<TenantDetailsDTO>>(`${this.apiUrl}/assign-subscription`, data);
    }
}
