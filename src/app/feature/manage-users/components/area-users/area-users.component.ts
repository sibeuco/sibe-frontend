import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { UserResponse } from 'src/app/shared/model/user.model';
import { UserNotificationService } from '../../service/user-notification.service';
import { Subscription } from 'rxjs';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-area-users',
  templateUrl: './area-users.component.html',
  styleUrls: ['./area-users.component.scss']
})
export class AreaUsersComponent implements OnInit, OnDestroy{

  @Output() usuarioSeleccionadoParaEditar = new EventEmitter<UserResponse>();

  usuarios: UserResponse[] = [];
  usuariosFiltrados: UserResponse[] = [];
  cargando = false;
  error = '';
  searchTerm = '';
  private subscriptions: Subscription[] = [];
  
  // Propiedades para el modal de confirmación
  usuarioAEliminar: UserResponse | null = null;
  eliminando = false;
  mensajeExito = '';
  mostrarMensajeExito = false;

  constructor(
    private userService: UserService,
    private userNotificationService: UserNotificationService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.suscribirseANotificaciones();
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  suscribirseANotificaciones(): void {
    // Suscribirse a notificaciones de usuarios creados
    const subCreado = this.userNotificationService.usuarioCreado$.subscribe(() => {
      this.obtenerUsuarios();
    });
    this.subscriptions.push(subCreado);

    // Suscribirse a notificaciones de usuarios actualizados
    const subActualizado = this.userNotificationService.usuarioActualizado$.subscribe(() => {
      this.obtenerUsuarios();
    });
    this.subscriptions.push(subActualizado);

    // Suscribirse a notificaciones de usuarios eliminados
    const subEliminado = this.userNotificationService.usuarioEliminado$.subscribe(() => {
      this.obtenerUsuarios();
    });
    this.subscriptions.push(subEliminado);
  }

  obtenerUsuarios(): void {
    this.cargando = true;
    this.error = '';

    this.userService.consultarUsuarios().subscribe({
      next: (res: UserResponse[]) => {
        console.log('Usuarios obtenidos del servicio (area-users):', res); // Debug log
        this.usuarios = res.filter(
          usuario => usuario.tipoUsuario?.nombre !== 'Administrador de dirección'
        );
        console.log('Usuarios filtrados (area-users):', this.usuarios); // Debug log

        //  Guarda también la lista filtrada para búsquedas
        this.usuariosFiltrados = [...this.usuarios];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al consultar usuarios:', err);
        this.error = 'No se pudieron cargar los usuarios.';
        this.cargando = false;
      }
    });
  }

  // para filtrar los usuarios por algún término de busqueda
  filtrarUsuarios(): void {
    if (!this.searchTerm.trim()) {
      this.usuariosFiltrados = [...this.usuarios];
    } else {
      const termino = this.searchTerm.toLowerCase().trim();
      this.usuariosFiltrados = this.usuarios.filter(usuario => 
        usuario.nombres?.toLowerCase().includes(termino) ||
        usuario.apellidos?.toLowerCase().includes(termino) ||
        usuario.correo?.toLowerCase().includes(termino) ||
        usuario.tipoUsuario?.nombre?.toLowerCase().includes(termino)
      );
    }
  }

  // Se ejecuta cuando se crea un nuevo usuario desde el modal
  onUsuarioCreado(response: any): void {
    console.log('Usuario creado:', response);
    // Recargar la lista de usuarios para mostrar el nuevo usuario
    this.obtenerUsuarios();
  }

  // Se ejecuta cuando se actualiza un usuario desde el modal
  onUsuarioActualizado(response: any): void {
    console.log('Usuario actualizado:', response);
    this.obtenerUsuarios();
  }

  // Selecciona el usuario para editar
  seleccionarUsuarioParaEditar(usuario: UserResponse): void {
    console.log('Usuario seleccionado para editar (area-users):', usuario); // Debug log
    console.log('Estructura de identificacion:', usuario.identificacion); // Debug log
    console.log('Estructura de tipoUsuario:', usuario.tipoUsuario); // Debug log
    this.usuarioSeleccionadoParaEditar.emit(usuario);
  }

  // Limpia el estado del modal
  private limpiarEstadoModal(): void {
    this.usuarioAEliminar = null;
    this.eliminando = false;
    this.mostrarMensajeExito = false;
    this.mensajeExito = '';
  }

  // Abre el modal de confirmación para eliminar un usuario
  eliminarUsuario(usuario: UserResponse): void {
    // Limpiar estado previo antes de abrir el modal
    this.limpiarEstadoModal();
    
    // Establecer el nuevo usuario a eliminar
    this.usuarioAEliminar = usuario;
    
    const modalElement = document.getElementById('confirmDeleteAreaModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  // Confirma la eliminación del usuario
  confirmarEliminacion(): void {
    if (!this.usuarioAEliminar) return;

    this.eliminando = true;
    this.error = '';

    this.userService.eliminarUsuario(this.usuarioAEliminar.identificador).subscribe({
      next: (response) => {
        console.log('Usuario eliminado exitosamente (area-users):', response); // Debug log
        this.eliminando = false;
        
        // Mostrar mensaje de éxito en el modal
        this.mensajeExito = 'Usuario eliminado exitosamente';
        this.mostrarMensajeExito = true;
        
        // Notificar a través del servicio para que todos los componentes se actualicen
        this.userNotificationService.notificarUsuarioEliminado(response);
        
        // Recargar la lista de usuarios
        this.obtenerUsuarios();
        
        // Cerrar el modal después de 2 segundos
        setTimeout(() => {
          const modalElement = document.getElementById('confirmDeleteAreaModal');
          if (modalElement) {
            const modal = Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
            }
          }
          
          // Limpiar el estado del modal
          this.limpiarEstadoModal();
        }, 2000);
      },
      error: (err) => {
        this.eliminando = false;
        console.error('Error al eliminar usuario (area-users):', err); // Debug log
        
        let mensajeError = 'Error al eliminar el usuario. Por favor, intente nuevamente.';
        if (err.error && err.error.mensaje) {
          mensajeError = err.error.mensaje;
        } else if (err.error && err.error.message) {
          mensajeError = err.error.message;
        }
        
        alert(mensajeError);
      }
    });
  }

}
