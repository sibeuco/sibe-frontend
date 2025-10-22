import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { UserResponse, UserRequest, EditUserRequest } from '../model/user.model';
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

  consultarUsuarioPorIdentificador(identificador: string): Observable<UserResponse> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.USUARIO_ENDPOINT}/${identificador}`;
    
    return this.doGet<UserResponse>(url, opts);
  }

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

  consultarUsuarioPorCorreo(correo: string): Observable<UserResponse> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.USUARIO_ENDPOINT}/usuario/correo/${correo}`;
    
    return this.doGet<UserResponse>(url, opts);
  }

  agregarNuevoUsuario(usuario: UserRequest): Observable<Response<string>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.USUARIO_ENDPOINT}`;
    
    return this.doPost<UserRequest, Response<string>>(url, usuario, opts);
  }

  modificarUsuario(identificador: string, usuario: EditUserRequest): Observable<Response<string>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.USUARIO_ENDPOINT}/usuario/${identificador}`;
    
    return this.doPut<EditUserRequest, Response<string>>(url, usuario, opts);
  }

  eliminarUsuario(identificador: string): Observable<Response<string>> {
    const opts = this.createDefaultOptions();
    const url = `${environment.endpoint}${this.USUARIO_ENDPOINT}/usuario/${identificador}`;
    
    return this.doDelete<Response<string>>(url, opts);
  }

}
