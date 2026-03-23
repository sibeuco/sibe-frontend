import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { IndicatorService } from '../../service/indicator.service';
import { IndicatorResponse } from '../../model/indicator.model';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit{

  searchTerm: string = '';
  indicadores: IndicatorResponse[] = [];
  indicadoresFiltrados: IndicatorResponse[] = [];
  cargando = false;
  error = '';

  // Paginación
  paginaActual = 0;
  totalPaginas = 0;
  totalElementos = 0;
  tamanioPagina = 10;

  // Propiedades para el modal de edición
  indicadorSeleccionado: IndicatorResponse | null = null;

  constructor(private indicatorService: IndicatorService) {}

  ngOnInit(): void {
    this.loadIndicators();
  }

  loadIndicators(): void {
    this.cargando = true;
    this.error = '';
    const busqueda = this.searchTerm?.trim() || undefined;

    this.indicatorService.consultarIndicadoresPaginado(this.paginaActual, this.tamanioPagina, busqueda).subscribe({
      next: (respuesta) => {
        this.indicadores = respuesta.contenido || [];
        this.indicadoresFiltrados = [...this.indicadores];
        this.totalElementos = respuesta.totalElementos;
        this.totalPaginas = respuesta.totalPaginas;
        this.paginaActual = respuesta.paginaActual;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar los indicadores:', error);
        this.error = 'No se pudieron cargar los indicadores.';
        this.cargando = false;
      }
    });
  }

  filterIndicators(): void {
    this.paginaActual = 0;
    this.loadIndicators();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.loadIndicators();
  }

  // Métodos para el modal de edición
  abrirModalEdicion(indicator: IndicatorResponse): void {
    this.indicadorSeleccionado = indicator;

    // Abrir el modal usando Bootstrap
    const modalElement = document.getElementById('edit-indicator-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  onIndicadorModificado(indicadorModificado: IndicatorResponse): void {
    // Recargar todos los indicadores desde el backend
    this.loadIndicators();

    // Cerrar el modal
    this.cerrarModal();
  }

  onIndicadorCancelado(): void {
    this.cerrarModal();
  }

  private cerrarModal(): void {
    const modalElement = document.getElementById('edit-indicator-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.indicadorSeleccionado = null;
  }

}
