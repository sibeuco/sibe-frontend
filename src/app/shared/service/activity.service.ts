import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { Response } from '../model/response.model';
import { environment } from 'src/environments/environment';
import { ActivityRequest, ActivityResponse, CancelActivityResponse, EditActivityRequest, StartActivityResponse } from '../model/activity.model';
import { ActivityExecutionResponse } from '../model/activity-execution.model';
import { ParticipantRequest, ParticipantResponse } from '../model/participant.model';
import { AcademicProgramsResponse, AcademicProgramTypesResponse, CostCentersResponse, FiltersRequest, IndicatorsResponse, MonthsResponse, ParticipantTypesResponse, SemestersResponse, YearsResponse } from '../model/filters.model';

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
  private readonly PARTICIPANTS_ENDPOINT = '/actividades/ejecuciones/ejecucion/participantes';
  private readonly CONTAR_PARTICIPANTES_ENDPOINT = '/actividades/ejecuciones/finalizadas/participantes/conteo';
  private readonly MESES_EJECUCIONES_FINALIZADAS_ENDPOINT = '/actividades/ejecuciones/finalizadas/meses';
  private readonly ANNOS_EJECUCIONES_FINALIZADAS_ENDPOINT = '/actividades/ejecuciones/finalizadas/annos';
  private readonly SEMESTRES_ESTUDIANTES_EJECUCIONES_FINALIZADAS_ENDPOINT = '/actividades/ejecuciones/finalizadas/semestres';
  private readonly CENTROS_COSTOS_EMPLEADOS_EJECUCIONES_FINALIZADAS_ENDPOINT = '/actividades/ejecuciones/finalizadas/centros-costos';
  private readonly TIPOS_PARTICIPANTES_EJECUCIONES_FINALIZADAS_ENDPOINT = '/actividades/ejecuciones/finalizadas/tipos-participantes';
  private readonly PROGRAMAS_ACADEMICOS_ESTUDIANTES_EJECUCIONES_FINALIZADAS_ENDPOINT = '/actividades/ejecuciones/finalizadas/programas-academicos';
  private readonly NIVELES_FORMACION_ESTUDIANTES_EJECUCIONES_FINALIZADAS_ENDPOINT = '/actividades/ejecuciones/finalizadas/niveles-formacion';
  private readonly INDICADORES_EJECUCIONES_FINALIZADAS_ENDPOINT = '/actividades/ejecuciones/finalizadas/indicadores';

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

  consultarParticipantesPorEjecucion(identificador: string): Observable<ParticipantResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.PARTICIPANTS_ENDPOINT}/${identificador}`;

    return this.doGet<ParticipantResponse[]>(url, opts);
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

  contarParticipantesTotales(filtro: FiltersRequest): Observable<number> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.CONTAR_PARTICIPANTES_ENDPOINT}`;

    return this.doPost<FiltersRequest, number>(url, filtro, opts);
  }

  consultarMesesEjecucionesFinalizadas(): Observable<MonthsResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.MESES_EJECUCIONES_FINALIZADAS_ENDPOINT}`;

    return this.doGet<MonthsResponse[]>(url, opts);
  }

  consultarAnnosEjecucionesFinalizadas(): Observable<YearsResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.ANNOS_EJECUCIONES_FINALIZADAS_ENDPOINT}`;

    return this.doGet<YearsResponse[]>(url, opts);
  }

  consultarSemestresEstudiantesEnEjecucionesFinalizadas(): Observable<SemestersResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.SEMESTRES_ESTUDIANTES_EJECUCIONES_FINALIZADAS_ENDPOINT}`;

    return this.doGet<SemestersResponse[]>(url, opts);
  }

  consultarCentrosCostosEmpleadosEnEjecucionesFinalizadas(): Observable<CostCentersResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.CENTROS_COSTOS_EMPLEADOS_EJECUCIONES_FINALIZADAS_ENDPOINT}`;

    return this.doGet<CostCentersResponse[]>(url, opts);
  }

  consultarTiposParticipantesEnEjecucionesFinalizadas(): Observable<ParticipantTypesResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.TIPOS_PARTICIPANTES_EJECUCIONES_FINALIZADAS_ENDPOINT}`;

    return this.doGet<ParticipantTypesResponse[]>(url, opts);
  }

  consultarProgramasAcademicosEstudiantesEnEjecucionesFinalizadas(): Observable<AcademicProgramsResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.PROGRAMAS_ACADEMICOS_ESTUDIANTES_EJECUCIONES_FINALIZADAS_ENDPOINT}`;

    return this.doGet<AcademicProgramsResponse[]>(url, opts);
  }

  consultarNivelesFormacionEstudiantesEnEjecucionesFinalizadas(): Observable<AcademicProgramTypesResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.NIVELES_FORMACION_ESTUDIANTES_EJECUCIONES_FINALIZADAS_ENDPOINT}`;

    return this.doGet<AcademicProgramTypesResponse[]>(url, opts);
  }

  consultarIndicadoresEnEjecucionesFinalizadas(): Observable<IndicatorsResponse[]> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.INDICADORES_EJECUCIONES_FINALIZADAS_ENDPOINT}`;

    return this.doGet<IndicatorsResponse[]>(url, opts);
  }

}