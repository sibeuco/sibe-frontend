import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {

  @Output() proyectoCreado = new EventEmitter<any>();
    
      proyecto = {
        numeroProyecto: '',
        nombre: '',
        objetivo: '',
        acciones: [] as string[]
      };

      // Lista de acciones disponibles
      accionesDisponibles = [
        { value: 'capacitacion', label: 'Capacitación en habilidades blandas' },
        { value: 'seguimiento', label: 'Seguimiento académico personalizado' },
        { value: 'tutoria', label: 'Tutoría individual' },
        { value: 'workshop', label: 'Workshops de desarrollo profesional' },
        { value: 'mentoring', label: 'Programa de mentoring' },
        { value: 'networking', label: 'Actividades de networking' },
        { value: 'investigacion', label: 'Apoyo en proyectos de investigación' },
        { value: 'practicas', label: 'Gestión de prácticas profesionales' },
        { value: 'becas', label: 'Gestión de becas y ayudas' },
        { value: 'orientacion', label: 'Orientación vocacional' },
        { value: 'liderazgo', label: 'Desarrollo de liderazgo' },
        { value: 'emprendimiento', label: 'Apoyo al emprendimiento' },
        { value: 'voluntariado', label: 'Programas de voluntariado' },
        { value: 'intercambio', label: 'Programas de intercambio estudiantil' },
        { value: 'eventos', label: 'Organización de eventos académicos' }
      ];

      accionesFiltradas = [...this.accionesDisponibles];
      searchAcciones = '';
      showDropdown = false;
    
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
          objetivo: '',
          acciones: [] as string[]
        };
        this.searchAcciones = '';
        this.accionesFiltradas = [...this.accionesDisponibles];
        this.showDropdown = false;
      }

      filterAcciones() {
        const term = this.searchAcciones.toLowerCase();
        if (term.trim() === '') {
          this.accionesFiltradas = [...this.accionesDisponibles];
        } else {
          this.accionesFiltradas = this.accionesDisponibles.filter(accion =>
            accion.label.toLowerCase().includes(term)
          );
        }
      }

      isActionSelected(value: string): boolean {
        return this.proyecto.acciones?.includes(value) || false;
      }

      toggleAction(value: string) {
        if (!this.proyecto.acciones) {
          this.proyecto.acciones = [];
        }
        
        const index = this.proyecto.acciones.indexOf(value);
        if (index > -1) {
          this.proyecto.acciones.splice(index, 1);
        } else {
          this.proyecto.acciones.push(value);
        }
      }

      removeAction(value: string) {
        if (this.proyecto.acciones) {
          const index = this.proyecto.acciones.indexOf(value);
          if (index > -1) {
            this.proyecto.acciones.splice(index, 1);
          }
        }
      }

      getSelectedActionsLabels(): string[] {
        if (!this.proyecto.acciones) return [];
        return this.proyecto.acciones
          .map(value => this.accionesDisponibles.find(accion => accion.value === value)?.label)
          .filter(label => label) as string[];
      }

      getActionValue(label: string): string {
        const accion = this.accionesDisponibles.find(accion => accion.label === label);
        return accion?.value || '';
      }


}
