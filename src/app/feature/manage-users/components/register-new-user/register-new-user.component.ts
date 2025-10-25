import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
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
  @Input() listaDesplegable: { identificador: string; nombre: string }[] = [];
  @Input() etiquetaCampo: string = 'Estructura Organizacional';
  @Input() nombreCampo: string = 'estructuraOrganizacional';
  @Input() modalId: string = 'register-user-modal';
  @Input() tipoComponente: 'department' | 'area' = 'department'; // Nuevo input para identificar el tipo de componente
  @Input() listaAreas: { identificador: string; nombre: string }[] = []; // Lista de áreas para comparar
  @Input() listaSubareas: { identificador: string; nombre: string }[] = []; // Lista de subáreas para comparar

  usuario = {
    nombres: '',
    apellidos: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    correo: '',
    clave: '',
    confirmarClave: '',
    tipoUsuario: '',
    estructuraOrganizacional: '',
    tipoEstructura: '' // Nuevo campo para seleccionar Área o Subárea
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

  // Propiedades para manejo de listas condicionales
  listaFiltrada: { identificador: string; nombre: string }[] = [];
  opcionesTipoEstructura = [
    { valor: 'area', etiqueta: 'Área' },
    { valor: 'subarea', etiqueta: 'Subárea' }
  ];

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

  onTipoEstructuraChange(): void {
    // Limpiar la selección de estructura organizacional cuando cambia el tipo
    this.usuario.estructuraOrganizacional = '';
    
    // Filtrar la lista según el tipo seleccionado
    if (this.usuario.tipoEstructura === 'area') {
      this.listaFiltrada = this.listaAreas;
    } else if (this.usuario.tipoEstructura === 'subarea') {
      this.listaFiltrada = this.listaSubareas;
    } else {
      this.listaFiltrada = [];
    }
  }

  determinarTipoArea(identificadorSeleccionado: string): string {
    if (this.tipoComponente === 'department') {
      return 'DIRECCION';
    } else if (this.tipoComponente === 'area') {
      
      if (this.usuario.tipoEstructura === 'area') {
        return 'AREA';
      } else if (this.usuario.tipoEstructura === 'subarea') {
        return 'SUBAREA';
      }
    }
    
    return '';
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

      const tipoArea = this.determinarTipoArea(this.usuario.estructuraOrganizacional);
      
      const userRequest: UserRequest = {
        tipoIdentificacion: this.usuario.tipoIdentificacion, // Solo el identificador
        numeroIdentificacion: this.usuario.numeroIdentificacion,
        nombres: this.usuario.nombres,
        apellidos: this.usuario.apellidos,
        correo: this.usuario.correo,
        clave: this.usuario.clave,
        tipoUsuario: this.usuario.tipoUsuario, // Solo el identificador
        area: {
          area: this.usuario.estructuraOrganizacional,
          tipoArea: tipoArea
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
    const camposBasicos = !!(
      this.usuario.nombres &&
      this.usuario.apellidos &&
      this.usuario.tipoIdentificacion &&
      this.usuario.numeroIdentificacion &&
      this.usuario.correo &&
      this.usuario.clave &&
      this.usuario.confirmarClave &&
      this.usuario.tipoUsuario
    );

    // Para department-users, solo necesita estructuraOrganizacional
    if (this.tipoComponente === 'department') {
      return camposBasicos && !!this.usuario.estructuraOrganizacional;
    }

    // Para area-users, necesita tipoEstructura y estructuraOrganizacional
    if (this.tipoComponente === 'area') {
      return camposBasicos && 
             !!this.usuario.tipoEstructura && 
             !!this.usuario.estructuraOrganizacional;
    }

    return camposBasicos;
  }

  cerrarModal() {
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
      
      // Asegurar que el backdrop se remueva completamente
      setTimeout(() => {
        // Remover cualquier backdrop que pueda quedar
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());
        
        // Remover la clase modal-open del body
        document.body.classList.remove('modal-open');
        
        // Restaurar el padding-right del body si fue modificado
        document.body.style.paddingRight = '';
        
        // Restaurar el overflow del body
        document.body.style.overflow = '';
      }, 300);
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
      tipoUsuario: '',
      estructuraOrganizacional: '',
      tipoEstructura: ''
    };
    this.listaFiltrada = [];
    this.error = '';
    this.mensajeExito = '';
  }

}
