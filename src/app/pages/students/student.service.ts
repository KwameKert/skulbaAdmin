import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Page } from '../shared/models/common.model';
import { CrossTenantStudentResponseDTO, StudentDTO } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = environment.apiBaseUrl + '/users/api/v1';

  constructor(private http: HttpClient) { }

  searchStudents(
    textSearch: string,
    page = 0,
    size = 10
  ): Observable<ApiResponse<Page<CrossTenantStudentResponseDTO>>> {
    const params = new HttpParams()
      .set('textSearch', textSearch)
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<Page<CrossTenantStudentResponseDTO>>>(
      `${this.apiUrl}/students/search/cross-tenant`,
      { params }
    );
  }


  getStudentDetails(tenantId: string, studentId: number): Observable<ApiResponse<StudentDTO>> {
    return this.http.get<ApiResponse<StudentDTO>>(
      `${this.apiUrl}/students/${tenantId}/${studentId}`
    );

  }
}
