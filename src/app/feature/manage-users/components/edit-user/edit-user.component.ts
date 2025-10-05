import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  @Output() usuarioCreado = new EventEmitter<any>();

  usuario = {
    nombre: '',
    apellido: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    correo: '',
    tipo: '',
    area: ''
  };

  registrarUsuario() {
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
      tipoIdentificacion: '',
      numeroIdentificacion: '',
      correo: '',
      tipo: '',
      area: ''
    };
  }

}
