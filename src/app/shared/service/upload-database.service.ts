import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadDatabaseService {
  private readonly API_URL_BASE = `${environment.endpoint}/carga_masiva`;

  constructor(private http: HttpClient) { }

  /**
   * Sube un archivo Excel al backend para empleados o estudiantes.
   * @param archivo Archivo Excel (.xlsx)
   * @param tipo 'empleados' | 'estudiantes'
   */
  subirArchivo(archivo: File, tipo: 'empleados' | 'estudiantes'): Observable<any> {
    return this.subirArchivoConHeaders(archivo, tipo);
  }

  /**
   * Método interno para subir archivo con headers de autorización
   */
  private subirArchivoConHeaders(archivo: File, tipo: 'empleados' | 'estudiantes'): Observable<any> {
    const formData = new FormData();

    // El nombre del parámetro debe coincidir con @RequestParam del backend
    // Según el backend: @RequestParam(ARCHIVO_PARAM) donde ARCHIVO_PARAM = "archivo"
    const paramName = 'archivo';
    formData.append(paramName, archivo);

    // Endpoint correcto según el backend: @RequestMapping(CARGA_MASIVA) + @PostMapping(EMPLEADOS/ESTUDIANTES)
    const endpoint = `${environment.endpoint}/carga_masiva/${tipo}`;

    // Obtener el token de autorización
    const token = window.sessionStorage.getItem('Authorization');

    // Headers para multipart/form-data con autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
    
    return this.http.post(endpoint, formData, { headers }).pipe(
      catchError(error => {
        // Si es error de autorización, probar sin headers
        if (error.status === 401 || error.status === 403) {
          return this.subirArchivoSinHeaders(archivo, tipo);
        }
        
        return throwError(() => error);
      })
    );
  }

  /**
   * Método interno para subir archivo sin headers de autorización
   */
  private subirArchivoSinHeaders(archivo: File, tipo: 'empleados' | 'estudiantes'): Observable<any> {
    const formData = new FormData();
    const paramName = 'archivo';
    formData.append(paramName, archivo);
    const endpoint = `${environment.endpoint}/carga_masiva/${tipo}`;

    return this.http.post(endpoint, formData).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}

