import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { UserService } from 'src/app/shared/service/user.service';
import { UserTypeService } from 'src/app/shared/service/user-type.service';
import { UserRequest } from 'src/app/shared/model/user.model';
import { UserTypeResponse } from 'src/app/shared/model/user-type.model';
import { IdentificationTypeService } from 'src/app/shared/service/identification-type.service';
import { IdentificationTypeResponse } from 'src/app/shared/model/identification-type.model';
import { UserNotificationService } from '../../service/user-notification.service';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.scss']
})
export class RegisterNewUserComponent implements OnInit {
  @Output() usuarioCreado = new EventEmitter<any>();

  usuario = {
    nombres: '',
    apellidos: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    correo: '',
    clave: '',
    confirmarClave: '',
    tipoUsuario: ''
  };

  areaData = {
    area: '7c02a46c-7410-4411-8b6a-f442b7b456d3', 
    tipoArea: 'DIRECCION'
  };

  cargando = false;
  error = '';
  mensajeExito = '';

  // Propiedades para tipos de identificación
  tiposIdentificacion: IdentificationTypeResponse[] = [];
  cargandoTiposIdentificacion = false;
  errorTiposIdentificacion = '';
  
  // Propiedades para tipos de usuario
  tiposUsuario: UserTypeResponse[] = [];
  cargandoTiposUsuario = false;
  errorTiposUsuario = '';

  constructor(
    private userService: UserService,
    private userTypeService: UserTypeService,
    private identificationTypeService: IdentificationTypeService,
    private userNotificationService: UserNotificationService
  ) {}

  ngOnInit(): void {
    this.cargarTiposUsuario();
    this.cargarTiposIdentificacion();
  }

  cargarTiposIdentificacion(): void {
    this.cargandoTiposIdentificacion = true;
    this.errorTiposIdentificacion = '';

    this.identificationTypeService.consultarTipoIdentificacion().subscribe({
      next: (tipos: IdentificationTypeResponse[]) => {
        this.tiposIdentificacion = tipos;
        this.cargandoTiposIdentificacion = false;
      },
      error: (err) => {
        console.error('Error al cargar tipos de identificación:', err);
        this.errorTiposIdentificacion = 'Error al cargar los tipos de identificación';
        this.cargandoTiposIdentificacion = false;
      }
    });
  }

  cargarTiposUsuario(): void {
    this.cargandoTiposUsuario = true;
    this.errorTiposUsuario = '';

    this.userTypeService.consultarTipoUsuario().subscribe({
      next: (tipos: UserTypeResponse[]) => {
        this.tiposUsuario = tipos;
        this.cargandoTiposUsuario = false;
      },
      error: (err) => {
        console.error('Error al cargar tipos de usuario:', err);
        this.errorTiposUsuario = 'Error al cargar los tipos de usuario';
        this.cargandoTiposUsuario = false;
      }
    });
  }

  registrarUsuario() {
    // Validar contraseñas
    if (this.usuario.clave !== this.usuario.confirmarClave) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    // Validar que todos los campos estén completos
    if (!this.validarFormulario()) {
      this.error = 'Por favor, complete todos los campos requeridos';
      return;
    }


    this.cargando = true;
    this.error = '';
    this.mensajeExito = '';

      const userRequest: UserRequest = {
        tipoIdentificacion: this.usuario.tipoIdentificacion, // Solo el identificador
        numeroIdentificacion: this.usuario.numeroIdentificacion,
        nombres: this.usuario.nombres,
        apellidos: this.usuario.apellidos,
        correo: this.usuario.correo,
        clave: this.usuario.clave,
        tipoUsuario: this.usuario.tipoUsuario, // Solo el identificador
        area: {
          area: this.areaData.area,
          tipoArea: this.areaData.tipoArea
        }
      };

    this.userService.agregarNuevoUsuario(userRequest).subscribe({
      next: (response) => {
        this.cargando = false;
        this.mensajeExito = 'Usuario creado exitosamente';
        
        // Emitir evento para actualizar la lista en el componente padre (mantener compatibilidad)
        this.usuarioCreado.emit(response);
        
        // Notificar a través del servicio para que todos los componentes se actualicen
        this.userNotificationService.notificarUsuarioCreado(response);
        
        // Limpiar formulario y cerrar modal después de un breve delay
        setTimeout(() => {
          this.limpiarFormulario();
          this.cerrarModal();
        }, 1500);
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al crear usuario:', err);
        
        if (err.error && err.error.mensaje) {
          this.error = err.error.mensaje;
        } else if (err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Error al crear el usuario. Por favor, intente nuevamente.';
        }
      }
    });
  }

  validarFormulario(): boolean {
    return !!(
      this.usuario.nombres &&
      this.usuario.apellidos &&
      this.usuario.tipoIdentificacion &&
      this.usuario.numeroIdentificacion &&
      this.usuario.correo &&
      this.usuario.clave &&
      this.usuario.confirmarClave &&
      this.usuario.tipoUsuario
    );
  }

  cerrarModal() {
    const modalElement = document.getElementById('register-user-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
  }


  limpiarFormulario() {
    this.usuario = {
      nombres: '',
      apellidos: '',
      tipoIdentificacion: '',
      numeroIdentificacion: '',
      correo: '',
      clave: '',
      confirmarClave: '',
      tipoUsuario: ''
    };
    this.error = '';
    this.mensajeExito = '';
  }

}
