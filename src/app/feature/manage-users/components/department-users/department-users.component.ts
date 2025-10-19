import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { UserResponse } from 'src/app/shared/model/user.model';
import { UserNotificationService } from '../../service/user-notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department-users',
  templateUrl: './department-users.component.html',
  styleUrls: ['./department-users.component.scss']
})
export class DepartmentUsersComponent implements OnInit, OnDestroy{

  @Output() usuarioSeleccionadoParaEditar = new EventEmitter<UserResponse>();

  usuarios: UserResponse[] = [];
    usuariosFiltrados: UserResponse[] = [];
    cargando = false;
    error = '';
    searchTerm = '';
    private subscriptions: Subscription[] = [];
  
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
        console.log('Usuarios obtenidos del servicio (department-users):', res); // Debug log
        this.usuarios = res.filter(
          usuario => usuario.tipoUsuario?.nombre === 'Administrador de dirección'
        );
        console.log('Usuarios filtrados (department-users):', this.usuarios); // Debug log

        // Guarda también la lista filtrada para búsquedas
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
      // Recargar la lista de usuarios para mostrar los cambios
      this.obtenerUsuarios();
    }

    // Selecciona el usuario para editar
    seleccionarUsuarioParaEditar(usuario: UserResponse): void {
      console.log('Usuario seleccionado para editar (department-users):', usuario); // Debug log
      console.log('Estructura de identificacion (department):', usuario.identificacion); // Debug log
      console.log('Estructura de tipoUsuario (department):', usuario.tipoUsuario); // Debug log
      this.usuarioSeleccionadoParaEditar.emit(usuario);
    }

    // Elimina un usuario
    eliminarUsuario(usuario: UserResponse): void {
      const confirmacion = confirm(`¿Está seguro de que desea eliminar al usuario ${usuario.nombres} ${usuario.apellidos}?`);
      
      if (confirmacion) {
        this.cargando = true;
        this.error = '';

        this.userService.eliminarUsuario(usuario.identificador).subscribe({
          next: (response) => {
            console.log('Usuario eliminado exitosamente (department):', response); // Debug log
            this.cargando = false;
            
            // Notificar a través del servicio para que todos los componentes se actualicen
            this.userNotificationService.notificarUsuarioEliminado(response);
            
            // Mostrar mensaje de éxito
            alert('Usuario eliminado exitosamente');
            
            // Recargar la lista de usuarios
            this.obtenerUsuarios();
          },
          error: (err) => {
            this.cargando = false;
            console.error('Error al eliminar usuario (department):', err); // Debug log
            
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

}
