import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PasswordRecoveryService {
    private readonly PASSWORD_RECOVERY_ENDPOINT = '/recuperacion/solicitar';

    constructor(private http: HttpClient) { }

    solicitarCodigo(correo: string): Observable<{ valor: string }> {
        const url = `${environment.endpoint}${this.PASSWORD_RECOVERY_ENDPOINT}/${correo}`;

        const opts = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<{ valor: string }>(url, {}, opts).pipe(
        catchError(error => {
            console.error('Error al solicitar el código de recuperación:', error);
            return throwError(() => error);
        })
    );

    }
}