import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSession } from '../../../shared/model/user-session.model';
import { StateService } from 'src/app/shared/service/state.service';
import { StateProps } from 'src/app/shared/model/state.enum';
import { LoginService } from '../service/login.service';
import { jwtDecode } from 'jwt-decode';
import { Login } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  
  formularioLogin:FormGroup | any;
  mensajeError: string = '';

  constructor(private formBuilder:FormBuilder, private stateService:StateService, private loginService:LoginService){
  }


  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      userInput:['', [Validators.required, Validators.email]],
      passwordInput:['', Validators.required]
    });
    
    this.formularioLogin.get('userInput')?.valueChanges.subscribe(() => {
    this.mensajeError = '';
    });

    this.formularioLogin.get('passwordInput')?.valueChanges.subscribe(() => {
      this.mensajeError = '';
    });
  }

  login(): void {
    if (this.formularioLogin.invalid) {
      return;
    }

    const loginData: Login = {
      correo: this.formularioLogin.get('userInput')?.value,
      contrasena: this.formularioLogin.get('passwordInput')?.value
    };

    this.loginService.validarLogin(loginData).subscribe({
      next: () => {
        const token = sessionStorage.getItem('Authorization');

        if (!token) {
          console.error('No se encontró el token en sessionStorage');
          return;
        }

        try {
          const decodedToken: any = jwtDecode(token);
          console.log('Token decodificado:', decodedToken);

          const userSession: UserSession = {
            id: decodedToken.id || '',
            correo: decodedToken.sub || loginData.correo,
            inicioSesion: true,
            tipoUsuario: decodedToken.role || ''
          };

          this.stateService.updateState(StateProps.USER_SESSION, userSession);
        } catch (error) {
          console.error('Error al decodificar el token:', error);
        }
      },
      error: (err) => {
      console.error('Error durante el login:', err);
      this.mensajeError = 'Correo o contraseña incorrectos.';
}
    });
  }
}
