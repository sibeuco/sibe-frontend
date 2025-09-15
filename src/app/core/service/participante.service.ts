import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Participante, AsistenciaActividad } from '../model/participante.model';
import { Response } from 'src/app/shared/model/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService extends HttpService {
  private readonly PARTICIPANTES_ENDPOINT = '/participantes';
  private readonly ASISTENCIA_ENDPOINT = '/asistencia';

  constructor(http: any) {
    super(http);
  }

  /**
   * Busca un participante por RFID o documento
   */
  buscarParticipante(rfid?: string, documento?: string): Observable<Response<Participante>> {
    const opts = this.createDefaultOptions();
    let url = `${environment.apiUrl}${this.PARTICIPANTES_ENDPOINT}/buscar`;
    
    if (rfid) {
      url += `?rfid=${rfid}`;
    } else if (documento) {
      url += `?documento=${documento}`;
    }
    
    return this.doGet<Response<Participante>>(url, opts);
  }

  /**
   * Guarda la lista de asistencias de una actividad
   */
  guardarAsistenciaActividad(asistencias: AsistenciaActividad[]): Observable<Response<any>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.apiUrl}${this.ASISTENCIA_ENDPOINT}/guardar`;
    
    return this.doPost<AsistenciaActividad[], Response<any>>(url, asistencias, opts);
  }

  /**
   * Obtiene todos los participantes
   */
  obtenerParticipantes(): Observable<Response<Participante[]>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.apiUrl}${this.PARTICIPANTES_ENDPOINT}`;
    
    return this.doGet<Response<Participante[]>>(url, opts);
  }
}
