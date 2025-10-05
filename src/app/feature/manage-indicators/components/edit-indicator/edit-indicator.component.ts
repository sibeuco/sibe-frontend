import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-edit-indicator',
  templateUrl: './edit-indicator.component.html',
  styleUrls: ['./edit-indicator.component.scss']
})
export class EditIndicatorComponent {
  @Output() indicadorCreado = new EventEmitter<any>();
    
      indicador = {
        nombre: '',
        tipoIndicador: '',
        temporalidad: '',
        proyecto: '',
        publicoInteres: ''
      };
    
      editarIndicador() {

        this.indicadorCreado.emit(this.indicador);
        this.limpiarFormulario();
    
        const modalElement = document.getElementById('userModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
      }
    
      limpiarFormulario() {
        this.indicador = {
          nombre: '',
          tipoIndicador: '',
          temporalidad: '',
          proyecto: '',
          publicoInteres: ''
        };
      }

}
