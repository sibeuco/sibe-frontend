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
import { DepartmentService } from 'src/app/shared/service/department.service';
import { AreaService } from 'src/app/shared/service/area.service';
import { SubAreaService } from 'src/app/shared/service/subarea.service';
import { DepartmentResponse } from 'src/app/shared/model/departmen.model';
import { AreaResponse } from 'src/app/shared/model/area.model';
import { SubAreaResponse } from 'src/app/shared/model/subarea.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnChanges {

  @Input() usuarioAEditar: UserResponse | null = null;
  @Output() usuarioActualizado = new EventEmitter<any>();
  @Input() tipoComponente: 'department' | 'area' = 'department';
  @Input() listaDepartamentos: { identificador: string; nombre: string }[] = [];
  @Input() listaAreas: { identificador: string; nombre: string }[] = [];
  @Input() listaSubareas: { identificador: string; nombre: string }[] = [];

  usuario = {
    nombres: '',
    apellidos: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    correo: '',
    tipoUsuario: '',
    estructuraOrganizacional: '',
    tipoEstructura: ''
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges triggered:', changes); // Debug log
    if (changes['usuarioAEditar']) {
      if (changes['usuarioAEditar'].currentValue) {
        console.log('UsuarioAEditar cambió, cargando datos...'); // Debug log
        this.cargarDatosUsuario();
      } else {
        console.log('UsuarioAEditar se limpió, limpiando formulario...'); // Debug log
        this.limpiarFormulario();
      }
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
      console.log('Usuario a editar:', this.usuarioAEditar); // Debug log
      this.usuario = {
        nombres: this.usuarioAEditar.nombres || '',
        apellidos: this.usuarioAEditar.apellidos || '',
        tipoIdentificacion: this.usuarioAEditar.identificacion?.tipoIdentificacion?.identificador || '',
        numeroIdentificacion: this.usuarioAEditar.identificacion?.numeroIdentificacion || '',
        correo: this.usuarioAEditar.correo || '',
        tipoUsuario: this.usuarioAEditar.tipoUsuario?.identificador || '',
        estructuraOrganizacional: this.usuarioAEditar.area?.area || '',
        tipoEstructura: this.determinarTipoEstructuraInicial()
      };
      
      // Configurar lista filtrada según el tipo de estructura
      this.configurarListaFiltrada();
      
      console.log('Datos cargados en el formulario:', this.usuario); // Debug log
    }
  }

  determinarTipoEstructuraInicial(): string {
    if (this.tipoComponente === 'department') {
      return '';
    }
    
    if (this.tipoComponente === 'area' && this.usuarioAEditar?.area?.area) {
      // Verificar si el área actual está en la lista de áreas
      const esArea = this.listaAreas.some(area => area.identificador === this.usuarioAEditar?.area?.area);
      if (esArea) {
        return 'area';
      }
      
      // Verificar si está en la lista de subáreas
      const esSubarea = this.listaSubareas.some(subarea => subarea.identificador === this.usuarioAEditar?.area?.area);
      if (esSubarea) {
        return 'subarea';
      }
    }
    
    return '';
  }

  configurarListaFiltrada(): void {
    if (this.usuario.tipoEstructura === 'area') {
      this.listaFiltrada = this.listaAreas;
    } else if (this.usuario.tipoEstructura === 'subarea') {
      this.listaFiltrada = this.listaSubareas;
    } else if (this.tipoComponente === 'department') {
      this.listaFiltrada = this.listaDepartamentos;
    } else {
      this.listaFiltrada = [];
    }
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

    const tipoArea = this.determinarTipoArea(this.usuario.estructuraOrganizacional);
    
    const editUserRequest: EditUserRequest = {
      tipoIdentificacion: this.usuario.tipoIdentificacion,
      numeroIdentificacion: this.usuario.numeroIdentificacion,
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      correo: this.usuario.correo,
      tipoUsuario: this.usuario.tipoUsuario,
      area: {
        area: this.usuario.estructuraOrganizacional,
        tipoArea: tipoArea
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
    const camposBasicos = !!(
      this.usuario.nombres &&
      this.usuario.apellidos &&
      this.usuario.tipoIdentificacion &&
      this.usuario.numeroIdentificacion &&
      this.usuario.correo &&
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

  abrirModal(): void {
    const modalElement = document.getElementById('edit-user-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  cerrarModal() {
    const modalElement = document.getElementById('edit-user-modal');
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
      tipoUsuario: '',
      estructuraOrganizacional: '',
      tipoEstructura: ''
    };
    this.listaFiltrada = [];
    this.error = '';
    this.mensajeExito = '';
    this.usuarioAEditar = null; // Limpiar la referencia al usuario
  }

}
