import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { ActionResponse } from '../../model/action.model';
import { ActionService } from '../../service/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit{

  searchTerm: string = '';
  acciones: ActionResponse[] = [];
  accionesFiltradas: ActionResponse[] = [];
  cargando: boolean = false;
  error: string = '';
  
  // Propiedades para el modal de edición
  accionSeleccionada: ActionResponse | null = null;

  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    this.obtenerAcciones();
  }

  obtenerAcciones(): void {
    this.cargando = true;
    this.error = '';

    this.actionService.consultarAcciones().subscribe({
      next: (data) => {
        this.acciones = data;
        this.accionesFiltradas = [...this.acciones];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener acciones:', err);
        this.error = 'No se pudieron cargar las acciones.';
        this.cargando = false;
      }
    });
  }

  filterActions(): void {
    const term = this.searchTerm.toLowerCase();
    this.accionesFiltradas = this.acciones.filter(action =>
      Object.values(action).some(value =>
        value && value.toString().toLowerCase().includes(term)
      )
    );
  }

  // Métodos para el modal de edición
  abrirModalEdicion(accion: ActionResponse): void {
    this.accionSeleccionada = accion;
    
    // Abrir el modal usando Bootstrap
    const modalElement = document.getElementById('edit-action-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  onAccionModificada(accionModificada: ActionResponse): void {
    // Actualizar la acción en la lista local
    const index = this.acciones.findIndex(a => a.identificador === accionModificada.identificador);
    if (index !== -1) {
      this.acciones[index] = accionModificada;
      this.accionesFiltradas = [...this.acciones];
    }
    
    // Cerrar el modal
    this.cerrarModal();
  }

  onAccionCancelada(): void {
    this.cerrarModal();
  }

  private cerrarModal(): void {
    const modalElement = document.getElementById('edit-action-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.accionSeleccionada = null;
  }

}
