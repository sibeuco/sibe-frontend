import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Modal } from 'bootstrap';
import { UserService } from 'src/app/shared/service/user.service';
import { UserTypeService } from 'src/app/shared/service/user-type.service';
import { IdentificationTypeService } from 'src/app/shared/service/identification-type.service';
import { EditUserRequest } from 'src/app/shared/model/user.model';
import { UserTypeResponse } from 'src/app/shared/model/user-type.model';
import { IdentificationTypeResponse } from 'src/app/shared/model/identification-type.model';
import { UserResponse } from 'src/app/shared/model/user.model';
import { UserNotificationService } from '../../service/user-notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnChanges {

  @Input() usuarioAEditar: UserResponse | null = null;
  @Output() usuarioActualizado = new EventEmitter<any>();

  usuario = {
    nombres: '',
    apellidos: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    correo: '',
    tipoUsuario: ''
  };

  areaData = {
    area: '7c02a46c-7410-4411-8b6a-f442b7b456d3',
    tipoArea: 'DIRECCION'
  };

  cargando = false;
  error = '';
  mensajeExito = '';

  tiposIdentificacion: IdentificationTypeResponse[] = [];
  cargandoTiposIdentificacion = false;
  errorTiposIdentificacion = '';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarioAEditar'] && changes['usuarioAEditar'].currentValue) {
      this.cargarDatosUsuario();
    }
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

  cargarDatosUsuario(): void {
    if (this.usuarioAEditar) {
      this.usuario = {
        nombres: this.usuarioAEditar.nombres,
        apellidos: this.usuarioAEditar.apellidos,
        tipoIdentificacion: this.usuarioAEditar.identificacion?.identificador || '',
        numeroIdentificacion: this.usuarioAEditar.identificacion?.numeroIdentificacion || '',
        correo: this.usuarioAEditar.correo,
        tipoUsuario: this.usuarioAEditar.tipoUsuario?.identificador || ''
      };
    }
  }

  actualizarUsuario() {
    if (!this.validarFormulario()) {
      this.error = 'Por favor, complete todos los campos requeridos';
      return;
    }

    if (!this.usuarioAEditar) {
      this.error = 'No se ha seleccionado un usuario para editar';
      return;
    }

    this.cargando = true;
    this.error = '';
    this.mensajeExito = '';

    const editUserRequest: EditUserRequest = {
      tipoIdentificacion: this.usuario.tipoIdentificacion,
      numeroIdentificacion: this.usuario.numeroIdentificacion,
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      correo: this.usuario.correo,
      tipoUsuario: this.usuario.tipoUsuario,
      area: {
        area: this.areaData.area,
        tipoArea: this.areaData.tipoArea
      }
    };

    this.userService.modificarUsuario(this.usuarioAEditar.identificador, editUserRequest).subscribe({
      next: (response) => {
        this.cargando = false;
        this.mensajeExito = 'Usuario actualizado exitosamente';
        
        // Emitir evento para actualizar la lista en el componente padre (mantener compatibilidad)
        this.usuarioActualizado.emit(response);
        
        // Notificar a través del servicio para que todos los componentes se actualicen
        this.userNotificationService.notificarUsuarioActualizado(response);
        
        setTimeout(() => {
          this.limpiarFormulario();
          this.cerrarModal();
        }, 1500);
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al actualizar usuario:', err);
        
        if (err.error && err.error.mensaje) {
          this.error = err.error.mensaje;
        } else if (err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Error al actualizar el usuario. Por favor, intente nuevamente.';
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
      this.usuario.tipoUsuario
    );
  }

  cerrarModal() {
    const modalElement = document.getElementById('edit-user-modal');
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
      tipoUsuario: ''
    };
    this.error = '';
    this.mensajeExito = '';
  }

}
