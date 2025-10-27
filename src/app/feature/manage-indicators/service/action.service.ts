import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { environment } from 'src/environments/environment';
import { ActionRequest, ActionResponse } from '../model/action.model';
import { Response } from 'src/app/shared/model/response.model';

@Injectable({
    providedIn: 'root'
})
export class ActionService extends HttpService {
    private readonly ACTION_ENDPOINT = '/acciones';

    constructor(http: HttpClient) {
        super(http);
    }

    consultarAcciones(): Observable<ActionResponse[]> {
        const opts = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            })
        };
        const url = `${environment.endpoint}${this.ACTION_ENDPOINT}`;
        return this.http.get<ActionResponse[]>(url, opts);
    }

    agregarNuevaAccion(accion: ActionRequest): Observable<Response<string>> {
        const opts = this.createDefaultOptions();
        const url = `${environment.endpoint}${this.ACTION_ENDPOINT}`;
        
        console.log('URL:', url);
        console.log('Body:', JSON.stringify(accion));
        console.log('Options:', opts);

        return this.doPost<ActionRequest, Response<string>>(url, accion, opts);
    }
}