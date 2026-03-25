import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { environment } from 'src/environments/environment';
import { ProjectResponse, ProjectRequest, EditProjectRequest } from '../model/project.model';
import { Response } from 'src/app/shared/model/response.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService extends HttpService {
    private readonly PROJECT_ENDPOINT = '/proyectos';

    constructor(http: HttpClient) {
        super(http);
    }

    consultarProyectos(): Observable<ProjectResponse[]> {
        const opts = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            })
        };
        const url = `${environment.endpoint}${this.PROJECT_ENDPOINT}`;
        return this.http.get<ProjectResponse[]>(url, opts);
    }

    agregarNuevoProyecto(proyecto: ProjectRequest): Observable<Response<string>> {
        const opts = this.createDefaultOptions();
        const url = `${environment.endpoint}${this.PROJECT_ENDPOINT}`;

        return this.doPost<ProjectRequest, Response<string>>(url, proyecto, opts);
    }

    modificarProyecto(identificador: string, proyecto: EditProjectRequest): Observable<{ valor: string }> {
        const opts = this.createDefaultOptions();
        const url = `${environment.endpoint}${this.PROJECT_ENDPOINT}/${identificador}`;

        return this.http.put<{ valor: string }>(url, proyecto, opts);
    }

}