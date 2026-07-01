import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IPage, Page } from '../shared/models/common.model';
import { environment } from 'src/environments/environment';
import { PayrollStatutoryConfig, PayrollPayeBand } from './payroll.model';

@Injectable({ providedIn: 'root' })
export class PayrollConfigService {
    private baseUrl = environment.apiBaseUrl + '/billings/api/v1/payroll-config';

    constructor(private http: HttpClient) { }

    getStatutory(page = 0, size = 10): Observable<ApiResponse<Page<PayrollStatutoryConfig>>> {
        return this.http.get<ApiResponse<Page<PayrollStatutoryConfig>>>(`${this.baseUrl}/statutory`, {
            params: { page, size },
        });
    }

    createStatutory(payload: Omit<PayrollStatutoryConfig, 'id' | 'createdAt' | 'updatedAt'>): Observable<ApiResponse<PayrollStatutoryConfig>> {
        return this.http.post<ApiResponse<PayrollStatutoryConfig>>(`${this.baseUrl}/statutory`, payload);
    }

    updateStatutory(id: number, payload: Omit<PayrollStatutoryConfig, 'id' | 'createdAt' | 'updatedAt'>): Observable<ApiResponse<PayrollStatutoryConfig>> {
        return this.http.put<ApiResponse<PayrollStatutoryConfig>>(`${this.baseUrl}/statutory/${id}`, payload);
    }

    getPayeBands(page = 0, size = 10): Observable<ApiResponse<Page<PayrollPayeBand>>> {
        return this.http.get<ApiResponse<Page<PayrollPayeBand>>>(`${this.baseUrl}/paye-bands`, {
            params: { page, size },
        });
    }

    createPayeBand(payload: Omit<PayrollPayeBand, 'id' | 'createdAt' | 'updatedAt'>): Observable<ApiResponse<PayrollPayeBand>> {
        return this.http.post<ApiResponse<PayrollPayeBand>>(`${this.baseUrl}/paye-bands`, payload);
    }

    updatePayeBand(id: number, payload: Omit<PayrollPayeBand, 'id' | 'createdAt' | 'updatedAt'>): Observable<ApiResponse<PayrollPayeBand>> {
        return this.http.put<ApiResponse<PayrollPayeBand>>(`${this.baseUrl}/paye-bands/${id}`, payload);
    }
}
