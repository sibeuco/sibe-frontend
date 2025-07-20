import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.scss']
})
export class RegisterNewUserComponent {
  @Output() usuarioCreado = new EventEmitter<any>();

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    confirmar: '',
    tipo: '',
    area: ''
  };

  registrarUsuario() {
    if (this.usuario.contrasena !== this.usuario.confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.usuarioCreado.emit(this.usuario);
    this.limpiarFormulario();

    const modalElement = document.getElementById('userModal');
if (modalElement) {
  const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
  modal.hide();
}
  }

  limpiarFormulario() {
    this.usuario = {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      confirmar: '',
      tipo: '',
      area: ''
    };
  }

}
