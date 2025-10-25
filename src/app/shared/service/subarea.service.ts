import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { environment } from 'src/environments/environment';
import { SubAreaResponse } from '../model/subarea.model';

@Injectable({
    providedIn: 'root'
})
export class SubAreaService extends HttpService {
    private readonly SUBAREA_ENDPOINT = '/subareas';

    constructor(http: HttpClient) {
        super(http);
    }

    consultarDirecciones(): Observable<SubAreaResponse[]> {
        const opts = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            })
        };
        const url = `${environment.endpoint}${this.SUBAREA_ENDPOINT}`;
        return this.http.get<SubAreaResponse[]>(url, opts);
    }
}