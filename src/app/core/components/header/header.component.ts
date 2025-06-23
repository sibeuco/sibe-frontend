import { Component, OnInit } from '@angular/core';
import { StateProps } from 'src/app/shared/model/state.enum';
import { StateService } from 'src/app/shared/service/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isHome=false;
  isCerrarSesion=false;

  constructor(private stateService:StateService){
  }

  ngOnInit(): void {
    const userSession = this.stateService.getState(StateProps.USER_SESSION);
    if (userSession != null && userSession != undefined){
      const isLoged = userSession.inicioSesion;
      this.isHome = isLoged;
      this.isCerrarSesion = isLoged;
    }
  }

}
