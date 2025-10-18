import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { UserResponse } from 'src/app/shared/model/user.model';
import { UserNotificationService } from '../../service/user-notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-area-users',
  templateUrl: './area-users.component.html',
  styleUrls: ['./area-users.component.scss']
})
export class AreaUsersComponent implements OnInit, OnDestroy{

  usuarios: UserResponse[] = [];
  usuariosFiltrados: UserResponse[] = [];
  cargando = false;
  error = '';
  searchTerm = '';
  usuarioSeleccionado: UserResponse | null = null;
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
  }

  obtenerUsuarios(): void {
    this.cargando = true;
    this.error = '';

    this.userService.consultarUsuarios().subscribe({
      next: (res: UserResponse[]) => {
        this.usuarios = res.filter(
          usuario => usuario.tipoUsuario.nombre !== 'Administrador de dirección'
        );

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
    // Recargar la lista de usuarios para mostrar los cambios
    this.obtenerUsuarios();
  }

  // Selecciona el usuario para editar
  seleccionarUsuarioParaEditar(usuario: UserResponse): void {
    this.usuarioSeleccionado = usuario;
  }

}
