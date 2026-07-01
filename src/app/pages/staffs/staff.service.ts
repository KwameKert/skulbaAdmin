import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Page } from '../shared/models/common.model';
import { CrossTenantStaffResponseDTO, Staff } from './staff.model';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private apiUrl = environment.apiBaseUrl + '/users/api/v1';

  constructor(private http: HttpClient) { }

  searchStaff(
    textSearch: string,
    page = 0,
    size = 10
  ): Observable<ApiResponse<Page<CrossTenantStaffResponseDTO>>> {
    const params = new HttpParams()
      .set('textSearch', textSearch)
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<Page<CrossTenantStaffResponseDTO>>>(
      `${this.apiUrl}/employees/search/cross-tenant`,
      { params }
    );
  }

  getStaffDetails(tenantId: string, staffId: number): Observable<ApiResponse<Staff>> {
    return this.http.get<ApiResponse<Staff>>(
      `${this.apiUrl}/employees/${tenantId}/${staffId}`
    );
  }
}
