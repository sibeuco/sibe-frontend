import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-register-new-indicator',
  templateUrl: './register-new-indicator.component.html',
  styleUrls: ['./register-new-indicator.component.scss']
})
export class RegisterNewIndicatorComponent {
    @Output() indicadorCreado = new EventEmitter<any>();
    
      indicador = {
        nombre: '',
        tipoIndicador: '',
        temporalidad: '',
        proyecto: '',
        publicoInteres: ''
      };
    
      registrarIndicador() {

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
