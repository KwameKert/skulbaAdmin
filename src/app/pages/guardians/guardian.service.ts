import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Page } from '../shared/models/common.model';
import { CrossTenantGuardianResponseDTO, Guardian } from './guardian.model';

@Injectable({ providedIn: 'root' })
export class GuardianService {
  private apiUrl = environment.apiBaseUrl + '/users/api/v1/students';

  constructor(private http: HttpClient) { }

  searchGuardians(
    textSearch: string,
    page = 0,
    size = 10
  ): Observable<ApiResponse<Page<CrossTenantGuardianResponseDTO>>> {
    const params = new HttpParams()
      .set('textSearch', textSearch)
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<Page<CrossTenantGuardianResponseDTO>>>(
      `${this.apiUrl}/guardians/search/cross-tenant`,
      { params }
    );
  }

  getGuardianDetails(tenantId: string, guardianId: number): Observable<ApiResponse<Guardian>> {
    return this.http.get<ApiResponse<Guardian>>(
      `${this.apiUrl}/guardians/${tenantId}/${guardianId}`
    );
  }
}
