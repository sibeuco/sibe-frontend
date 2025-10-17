import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { UserResponse } from '../model/user.model';
import { Response } from '../model/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {
  private readonly USUARIO_ENDPOINT = '/usuarios';

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Consulta un usuario por su identificador UUID
   * GET /{identificador}
   */
  consultarUsuarioPorIdentificador(identificador: string): Observable<Response<UserResponse>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.USUARIO_ENDPOINT}/${identificador}`;
    
    return this.doGet<Response<UserResponse>>(url, opts);
  }

  /**
   * Consulta todos los usuarios
   * GET /usuarios
   */
  consultarUsuarios(): Observable<UserResponse[]> {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      })
    };
    const url = `${environment.endpoint}${this.USUARIO_ENDPOINT}`;
    return this.http.get<UserResponse[]>(url, opts);
  }

  /**
   * Consulta un usuario por su correo electrónico
   * GET /usuario/correo/{correo}
   */
  consultarUsuarioPorCorreo(correo: string): Observable<Response<UserResponse>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.USUARIO_ENDPOINT}/usuario/correo/${correo}`;
    
    return this.doGet<Response<UserResponse>>(url, opts);
  }

}
