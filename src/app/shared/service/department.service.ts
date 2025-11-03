import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { Response } from '../model/response.model';
import { environment } from 'src/environments/environment';
import { DepartmentResponse } from '../model/department.model';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService extends HttpService {
    private readonly DIRECCION_ENDPOINT = '/direcciones';

    constructor(http: HttpClient) {
        super(http);
    }

    consultarDirecciones(): Observable<DepartmentResponse[]> {
        const opts = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            })
        };
        const url = `${environment.endpoint}${this.DIRECCION_ENDPOINT}`;
        return this.http.get<DepartmentResponse[]>(url, opts);
    }

}