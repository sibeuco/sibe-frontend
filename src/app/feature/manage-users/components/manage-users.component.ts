import { Component, ViewChild } from '@angular/core';
import { UserResponse } from 'src/app/shared/model/user.model';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  @ViewChild(EditUserComponent) editUserComponent!: EditUserComponent;
  usuarioSeleccionado: UserResponse | null = null;

  onUsuarioSeleccionadoParaEditar(usuario: UserResponse): void {
    console.log('Usuario seleccionado en manage-users:', usuario); // Debug log
    this.usuarioSeleccionado = usuario;
    
    // Abrir el modal programáticamente después de un pequeño delay
    setTimeout(() => {
      this.abrirModalEditar();
    }, 100);
  }

  abrirModalEditar(): void {
    if (this.editUserComponent) {
      this.editUserComponent.abrirModal();
    }
  }

  onUsuarioActualizado(response: any): void {
    console.log('Usuario actualizado en manage-users:', response); // Debug log
    // Limpiar la selección después de actualizar
    this.usuarioSeleccionado = null;
  }
}
