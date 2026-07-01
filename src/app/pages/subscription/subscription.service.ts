
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../shared/models/common.model';
import { SubscriptionPlan, SubscriptionPlanDTO, Module, AssignModulesDTO } from './subscription.model';

@Injectable({
    providedIn: 'root'
})

export class SubscriptionServiceService {
    private apiUrl = environment.apiBaseUrl + '/billings/api/v1';

    constructor(private http: HttpClient) { }

    listSubscription(): Observable<ApiResponse<SubscriptionPlan[]>> {
        return this.http.get<ApiResponse<SubscriptionPlan[]>>(this.apiUrl + '/subscription-plans');
    }

    createSubscription(req: SubscriptionPlanDTO): Observable<ApiResponse<SubscriptionPlan>> {
        return this.http.post<ApiResponse<SubscriptionPlan>>(this.apiUrl + '/subscription-plans', req);
    }

    updateSubscription(id: number, req: SubscriptionPlanDTO): Observable<ApiResponse<SubscriptionPlan>> {
        return this.http.put<ApiResponse<SubscriptionPlan>>(`${this.apiUrl}/subscription-plans/${id}`, req);
    }

    listModules(): Observable<ApiResponse<Module[]>> {
        return this.http.get<ApiResponse<Module[]>>(this.apiUrl + '/modules');
    }

    createModules(req: Module): Observable<ApiResponse<Module>> {
        return this.http.post<ApiResponse<Module>>(this.apiUrl + '/modules', req);
    }

    updateModules(id: number, req: Module): Observable<ApiResponse<Module>> {
        return this.http.put<ApiResponse<Module>>(`${this.apiUrl}/modules/${id}`, req);
    }

    assignModulesToSubscription(data: AssignModulesDTO): Observable<ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(`${this.apiUrl}/subscription-plans/assign-modules`, data);
    }

}
