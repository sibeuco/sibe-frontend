import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FechaProgramada, EstadoFechaProgramada } from '../../model/fecha-programada.model';
import { ActivityResponse } from '../../model/activity.model';
import { ActivityService } from '../../service/activity.service';
import { ActivityExecutionResponse } from '../../model/activity-execution.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit, OnChanges {
  @Input() actividad: ActivityResponse | null = null;
  @Input() redirectLink: string = ''; // Link para redirección
  @Output() verFecha = new EventEmitter<FechaProgramada>();
  @Output() cerrarModal = new EventEmitter<void>();

  fechasOrdenadas: FechaProgramada[] = [];
  cargando = false;
  error = '';

  constructor(
    private router: Router,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    if (this.actividad) {
      this.cargarEjecuciones();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actividad'] && this.actividad) {
      this.cargarEjecuciones();
    }
  }

  /**
   * Carga las ejecuciones de la actividad desde el servicio
   */
  private cargarEjecuciones(): void {
    if (!this.actividad || !this.actividad.identificador) {
      this.fechasOrdenadas = [];
      return;
    }

    this.cargando = true;
    this.error = '';

    this.activityService.consultarEjecuciones(this.actividad.identificador)
      .pipe(
        catchError(() => {
          this.error = 'Error al cargar las fechas programadas.';
          this.cargando = false;
          return of([]);
        })
      )
      .subscribe({
        next: (ejecuciones: ActivityExecutionResponse[]) => {
          this.fechasOrdenadas = this.mapearEjecucionesAFechas(ejecuciones);
          this.cargando = false;
        }
      });
  }

  /**
   * Mapea las ejecuciones a fechas programadas
   */
  private mapearEjecucionesAFechas(ejecuciones: ActivityExecutionResponse[]): FechaProgramada[] {
    return ejecuciones
      .filter(ej => ej.fechaProgramada) // Solo las que tienen fecha programada
      .map((ej, index) => ({
        id: parseInt(ej.identificador) || index + 1,
        fecha: this.parseFechaLocal(ej.fechaProgramada),
        estado: this.mapearEstado(ej.estadoActividad?.nombre),
        actividadId: parseInt(this.actividad?.identificador || '0') || 0
      }))
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  }

  /**
   * Mapea el nombre del estado a EstadoFechaProgramada
   */
  private mapearEstado(nombreEstado: string | undefined): EstadoFechaProgramada {
    if (!nombreEstado) {
      return EstadoFechaProgramada.PENDIENTE;
    }

    const estadoNormalizado = nombreEstado.toLowerCase().trim();
    
    if (estadoNormalizado === 'pendiente') {
      return EstadoFechaProgramada.PENDIENTE;
    } else if (estadoNormalizado === 'en curso') {
      return EstadoFechaProgramada.EN_CURSO;
    } else if (estadoNormalizado === 'finalizado') {
      return EstadoFechaProgramada.FINALIZADO;
    }

    return EstadoFechaProgramada.PENDIENTE;
  }

  /**
   * Parsea una fecha string del backend como fecha local
   */
  private parseFechaLocal(fechaStr: string): Date {
    // Caso 'YYYY-MM-DD'
    const soloFecha = /^\d{4}-\d{2}-\d{2}$/;
    if (soloFecha.test(fechaStr)) {
      const [y, m, d] = fechaStr.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    // Fallback ISO
    const d = new Date(fechaStr);
    if (!isNaN(d.getTime())) {
      return d;
    }
    // Último recurso: retornar fecha actual
    return new Date();
  }

  /**
   * Obtiene la clase CSS para el estado de la fecha programada
   */
  getStatusClass(estado: EstadoFechaProgramada): string {
    switch (estado) {
      case EstadoFechaProgramada.PENDIENTE:
        return 'status-pendiente';
      case EstadoFechaProgramada.EN_CURSO:
        return 'status-en-curso';
      case EstadoFechaProgramada.FINALIZADO:
        return 'status-finalizado';
      default:
        return 'status-pendiente';
    }
  }

  /**
   * Maneja el clic en el botón "Ver"
   */
  verFechaProgramada(fechaProgramada: FechaProgramada): void {
    // Emitir el evento para mantener compatibilidad
    this.verFecha.emit(fechaProgramada);
    
    // Cerrar el modal correctamente antes de navegar
    this.cerrarModalCompletamente();
    
    // Si hay un link de redirección, navegar a él
    if (this.redirectLink) {
      this.router.navigate([this.redirectLink]);
    }
  }

  /**
   * Cierra el modal
   */
  cerrar(): void {
    this.cerrarModal.emit();
  }

  /**
   * Cierra el modal completamente, eliminando el backdrop
   */
  private cerrarModalCompletamente(): void {
    const modalElement = document.getElementById('date-selector-modal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
        // Forzar la eliminación del backdrop después de un pequeño delay
        setTimeout(() => {
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
          // Remover la clase modal-open del body
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
        }, 150);
      }
    }
    // Emitir el evento de cerrar modal
    this.cerrarModal.emit();
  }

  /**
   * Función para realizar el tracking de las fechas por ID
   */
  trackByFechaId(index: number, fecha: FechaProgramada): number {
    return fecha.id;
  }
}
