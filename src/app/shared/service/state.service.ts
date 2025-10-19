import { Injectable } from '@angular/core';
import { StateProps } from '../model/state.enum';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  private stateProps: Map<StateProps, any> = new Map();
  private state = new BehaviorSubject<Map<StateProps, any>>(new Map());

  getState(prop:StateProps):any{
    return this.stateProps.get(prop);
  }

  updateState(prop:StateProps, value:any):void{
    this.stateProps.set(prop, value);
    this.state.next(this.stateProps);
  }

  deleteProperty(prop:StateProps){
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
