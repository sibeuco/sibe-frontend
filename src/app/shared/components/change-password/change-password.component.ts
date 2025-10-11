import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Output() contrasenaActualizada = new EventEmitter<any>();

  passwords = {
    contrasenaActual: '',
    nuevaContrasena: '',
    confirmarContrasena: ''
  };

  cambiarContrasena() {
    if (this.passwords.nuevaContrasena !== this.passwords.confirmarContrasena) {
      alert('Las contraseñas nuevas no coinciden');
      return;
    }

    if (this.passwords.nuevaContrasena === this.passwords.contrasenaActual) {
      alert('La nueva contraseña debe ser diferente a la actual');
      return;
    }

    // Emitir el evento con las contraseñas para que el componente padre maneje la lógica
    this.contrasenaActualizada.emit({
      contrasenaActual: this.passwords.contrasenaActual,
      nuevaContrasena: this.passwords.nuevaContrasena
    });
    
    this.limpiarFormulario();
    this.cerrarModal();
  }

  limpiarFormulario() {
    this.passwords = {
      contrasenaActual: '',
      nuevaContrasena: '',
      confirmarContrasena: ''
    };
  }

  cerrarModal() {
    const modalElement = document.getElementById('change-password-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
  }
}
