import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadDatabaseService {
  private readonly API_URL_BASE = `${environment.endpoint}`; // Base URL del backend

  constructor(private http: HttpClient) { }

  /**
   * Sube un archivo Excel al backend para ser procesado y guardado en la base de datos
   * @param archivo El archivo Excel a subir
   * @param tipo Tipo de base de datos: 'empleados' o 'estudiantes'
   * @returns Observable con la respuesta del backend
   */
  subirArchivo(archivo: File, tipo: 'empleados' | 'estudiantes'): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);

    // Determinar el endpoint según el tipo de base de datos
    const endpoint = tipo === 'empleados' 
      ? `${this.API_URL_BASE}/upload/empleados`
      : `${this.API_URL_BASE}/upload/estudiantes`;

    // Para archivos, no se debe establecer el Content-Type manualmente
    // Angular lo establecerá automáticamente con el boundary correcto
    const headers = new HttpHeaders();
    // No incluir 'Content-Type': 'multipart/form-data' 
    // Angular lo añadirá automáticamente con el boundary

    return this.http.post<any>(endpoint, formData, { headers });
  }

  /**
   * Sube un archivo Excel con datos adicionales
   * @param archivo El archivo Excel a subir
   * @param tipo Tipo de base de datos: 'empleados' o 'estudiantes'
   * @param datosAdicionales Objeto con datos adicionales para enviar
   * @returns Observable con la respuesta del backend
   */
  subirArchivoConDatos(archivo: File, tipo: 'empleados' | 'estudiantes', datosAdicionales: any): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    
    // Agregar datos adicionales al FormData
    Object.keys(datosAdicionales).forEach(key => {
      formData.append(key, datosAdicionales[key]);
    });

    // Determinar el endpoint según el tipo de base de datos
    const endpoint = tipo === 'empleados' 
      ? `${this.API_URL_BASE}/upload/empleados`
      : `${this.API_URL_BASE}/upload/estudiantes`;

    return this.http.post<any>(endpoint, formData);
  }
}

