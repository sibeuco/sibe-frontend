import { Injectable } from '@angular/core';
import { StateProps } from '../model/state.enum';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSession } from 'src/app/feature/login/model/user-session.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private stateProps: Map<StateProps, any> = new Map();
  private state = new BehaviorSubject<Map<StateProps, any>>(new Map());

  constructor() {
    this.rehydrateSession();
  }

  private rehydrateSession(): void {
    const token = window.sessionStorage.getItem('Authorization');

    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const userSession: UserSession = {
          correo: tokenPayload.email,
          identificador: tokenPayload.id || tokenPayload.identificador,
          authorities: tokenPayload.authorities.split(','),
          logged: true,
          rol: tokenPayload.rol || '',
          direccionId: tokenPayload.direccionId || '',
          areaId: tokenPayload.areaId || '',
          subareaId: tokenPayload.subareaId || ''
        };
        this.updateState(StateProps.USER_SESSION, userSession);

      } catch (error) {
        console.error('Error al rehidratar la sesión desde sessionStorage:', error);
        window.sessionStorage.removeItem('Authorization');
      }
    }
  }

  getState(prop:StateProps):any{
    const val = this.stateProps.get(prop);
    console.log('[DEBUG getState]', prop, '→ rol:', val?.rol, '| mapId:', (this as any).__debugId);
    return val;
  }

  updateState(prop:StateProps, value:any):void{
    if (!(this as any).__debugId) { (this as any).__debugId = Math.random().toString(36).substr(2, 5); }
    this.stateProps.set(prop, value);
    const verification = this.stateProps.get(prop);
    console.log('[DEBUG updateState]', prop, '→ set rol:', value?.rol, '| verify rol:', verification?.rol, '| mapId:', (this as any).__debugId);
    this.state.next(this.stateProps);
  }

  deleteProperty(prop:StateProps){
    console.log('[DEBUG deleteProperty]', prop, '| mapId:', (this as any).__debugId);
    this.stateProps.delete(prop);
    this.state.next(this.stateProps);
  }

  select<T>(prop:StateProps):Observable<T | undefined>{
    return this.state.asObservable().pipe(
      map(stateMap => stateMap.get(prop) as T | undefined),
      distinctUntilChanged()
    );
  }
}
