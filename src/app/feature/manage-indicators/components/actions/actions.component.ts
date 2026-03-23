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

  // Paginación
  paginaActual = 0;
  totalPaginas = 0;
  totalElementos = 0;
  tamanioPagina = 10;

  // Propiedades para el modal de edición
  accionSeleccionada: ActionResponse | null = null;

  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    this.obtenerAcciones();
  }

  obtenerAcciones(): void {
    this.cargando = true;
    this.error = '';
    const busqueda = this.searchTerm?.trim() || undefined;

    this.actionService.consultarAccionesPaginado(this.paginaActual, this.tamanioPagina, busqueda).subscribe({
      next: (respuesta) => {
        this.acciones = respuesta.contenido || [];
        this.accionesFiltradas = [...this.acciones];
        this.totalElementos = respuesta.totalElementos;
        this.totalPaginas = respuesta.totalPaginas;
        this.paginaActual = respuesta.paginaActual;
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
    this.paginaActual = 0;
    this.obtenerAcciones();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.obtenerAcciones();
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
