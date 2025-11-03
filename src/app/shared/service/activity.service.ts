import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { Response } from '../model/response.model';
import { environment } from 'src/environments/environment';
import { ActivityRequest, ActivityResponse } from '../model/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends HttpService {
  private readonly ACTIVITY_ENDPOINT = '/actividades';

  constructor(http: HttpClient) {
    super(http);
  }

  agregarNuevaActividad(actividad: ActivityRequest): Observable<Response<string>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.ACTIVITY_ENDPOINT}`;

    return this.doPost<ActivityRequest, Response<string>>(url, actividad, opts);
  }

  consultarActividades(): Observable<ActivityResponse[]> {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      })
    };
    const url = `${environment.endpoint}${this.ACTIVITY_ENDPOINT}`;
    return this.http.get<ActivityResponse[]>(url, opts);
  }
}