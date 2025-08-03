import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-register-new-project',
  templateUrl: './register-new-project.component.html',
  styleUrls: ['./register-new-project.component.scss']
})
export class RegisterNewProjectComponent {

  @Output() proyectoCreado = new EventEmitter<any>();
    
      proyecto = {
        numeroProyecto: '',
        nombre: '',
        objetivo: '',
      };
    
      registrarProyecto() {

        this.proyectoCreado.emit(this.proyecto);
        this.limpiarFormulario();
    
        const modalElement = document.getElementById('userModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
      }
    
      limpiarFormulario() {
        this.proyecto = {
          numeroProyecto: '',
          nombre: '',
          objetivo: ''
        };
      }

}
