import { Injectable } from '@angular/core';
import { StateProps } from '../model/state.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
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
  
}
