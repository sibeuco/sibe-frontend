import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Modal } from 'bootstrap';
import { ProjectService } from '../../service/project.service';
import { ProjectResponse } from '../../model/project.model';

@Component({
  selector: 'app-register-new-indicator',
  templateUrl: './register-new-indicator.component.html',
  styleUrls: ['./register-new-indicator.component.scss']
})
export class RegisterNewIndicatorComponent implements OnInit {
    @Output() indicadorCreado = new EventEmitter<any>();
    
      indicador = {
        nombre: '',
        tipoIndicador: '',
        temporalidad: '',
        proyecto: '',
        publicoInteres: ''
      };

      // Lista de proyectos desde el servicio
      proyectos: ProjectResponse[] = [];
      cargandoProyectos: boolean = false;

      constructor(private projectService: ProjectService) {}

      ngOnInit(): void {
        this.cargarProyectos();
      }

      cargarProyectos(): void {
        this.cargandoProyectos = true;
        this.projectService.consultarProyectos().subscribe({
          next: (proyectos: ProjectResponse[]) => {
            this.proyectos = proyectos;
            this.cargandoProyectos = false;
          },
          error: (error) => {
            console.error('Error al cargar los proyectos:', error);
            this.cargandoProyectos = false;
          }
        });
      }
    
      registrarIndicador() {

        this.indicadorCreado.emit(this.indicador);
        this.limpiarFormulario();
    
        const modalElement = document.getElementById('register-indicator-modal');
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
