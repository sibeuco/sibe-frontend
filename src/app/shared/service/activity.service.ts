import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { Response } from '../model/response.model';
import { environment } from 'src/environments/environment';
import { ActivityRequest, ActivityResponse, CancelActivityResponse, EditActivityRequest, StartActivityResponse } from '../model/activity.model';
import { ActivityExecutionResponse } from '../model/activity-execution.model';
import { ParticipantRequest } from '../model/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends HttpService {
  private readonly ACTIVITY_ENDPOINT = '/actividades';
  private readonly ACTIVITY_AREA_ENDPOINT = '/actividades/area';
  private readonly ACTIVITY_DEPARTMENT_ENDPOINT = '/actividades/direccion';
  private readonly ACTIVITY_SUBAREA_ENDPOINT = '/actividades/subarea';
  private readonly ACTIVITY_EXECUTION_ENDPOINT = '/actividades/ejecuciones';
  private readonly START_ACTIVITY_ENDPOINT = '/actividades/iniciar';
  private readonly CANCEL_ACTIVITY_ENDPOINT = '/actividades/cancelar';
  private readonly END_ACTIVITY_ENDPOINT = '/actividades/finalizar';

  constructor(http: HttpClient) {
    super(http);
  }

  agregarNuevaActividad(actividad: ActivityRequest): Observable<Response<string>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.ACTIVITY_ENDPOINT}`;

    return this.doPost<ActivityRequest, Response<string>>(url, actividad, opts);
  }

  modificarActividad(identificador: string, actividad: EditActivityRequest): Observable<Response<string>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.ACTIVITY_ENDPOINT}/${identificador}`;

    return this.doPut<EditActivityRequest, Response<string>>(url, actividad, opts);
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

  consultarPorArea(identificador: string): Observable<ActivityResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.ACTIVITY_AREA_ENDPOINT}/${identificador}`;

    return this.doGet<ActivityResponse[]>(url, opts);
  }

  consultarPorDireccion(identificador: string): Observable<ActivityResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.ACTIVITY_DEPARTMENT_ENDPOINT}/${identificador}`;

    return this.doGet<ActivityResponse[]>(url, opts);
  }

  consultarPorSubarea(identificador: string): Observable<ActivityResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.ACTIVITY_SUBAREA_ENDPOINT}/${identificador}`;

    return this.doGet<ActivityResponse[]>(url, opts);
  }

  consultarEjecuciones(identificador: string): Observable<ActivityExecutionResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.ACTIVITY_EXECUTION_ENDPOINT}/${identificador}`;

    return this.doGet<ActivityExecutionResponse[]>(url, opts);

  }

  iniciarActividad(identificador: string): Observable<StartActivityResponse> {
    const url = `${environment.endpoint}${this.START_ACTIVITY_ENDPOINT}/${identificador}`;
    return this.http.put<StartActivityResponse>(url, {});
  }

  cancelarActividad(identificador: string): Observable<CancelActivityResponse> {
    const url = `${environment.endpoint}${this.CANCEL_ACTIVITY_ENDPOINT}/${identificador}`;
    return this.http.put<CancelActivityResponse>(url, {});
  }

  finalizarActividad(identificador: string, participantes: ParticipantRequest[]): Observable<Response<string>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.END_ACTIVITY_ENDPOINT}/${identificador}`;  

    return this.doPut<ParticipantRequest[], Response<string>>(url, participantes, opts);
  }

}