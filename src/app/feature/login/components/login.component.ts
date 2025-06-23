import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSession } from '../../../shared/model/user-session.model';
import { StateService } from 'src/app/shared/service/state.service';
import { StateProps } from 'src/app/shared/model/state.enum';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  formularioLogin:FormGroup | any;

  constructor(private formBuilder:FormBuilder, private stateService:StateService, private loginService:LoginService){
  }


  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      userInput:['', [Validators.required, Validators.email]],
      passwordInput:['', Validators.required]
    });
  }

  login(): void{
    //Aquí va la lógica para loguearse
    const userSession:UserSession={
      id:'',
      correo:'',
      inicioSesion:true,
      tipoUsuario:''
    }

    this.stateService.updateState(StateProps.USER_SESSION, userSession);

  }

}
