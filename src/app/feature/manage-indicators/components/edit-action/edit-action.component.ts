import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss']
})
export class EditActionComponent {

  @Output() accionCreada = new EventEmitter<any>();
    
      accion = {
        detalle: '',
        objetivo: ''
      };
    
      registrarAccion() {

        this.accionCreada.emit(this.accion);
        this.limpiarFormulario();
    
        const modalElement = document.getElementById('userModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
      }
    
      limpiarFormulario() {
        this.accion = {
          detalle: '',
          objetivo: ''
        };
      }

}
