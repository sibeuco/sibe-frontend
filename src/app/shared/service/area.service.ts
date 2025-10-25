import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/service/http.service';
import { environment } from 'src/environments/environment';
import { AreaResponse } from '../model/area.model';

@Injectable({
    providedIn: 'root'
})
export class AreaService extends HttpService {
    private readonly AREA_ENDPOINT = '/areas';

    constructor(http: HttpClient) {
        super(http);
    }

    consultarAreas(): Observable<AreaResponse[]> {
            const opts = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                })
            };
            const url = `${environment.endpoint}${this.AREA_ENDPOINT}`;
            return this.http.get<AreaResponse[]>(url, opts);
        }

}