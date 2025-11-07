import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FechaProgramada, EstadoFechaProgramada } from '../../model/fecha-programada.model';
import { ActivityResponse } from '../../model/activity.model';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit, OnChanges {
  @Input() actividad: ActivityResponse | null = null;
  @Input() fechasProgramadas: FechaProgramada[] = [];
  @Input() redirectLink: string = ''; // Link para redirección
  @Output() verFecha = new EventEmitter<FechaProgramada>();
  @Output() cerrarModal = new EventEmitter<void>();

  fechasOrdenadas: FechaProgramada[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.ordenarFechas();
  }

  ngOnChanges(): void {
    this.ordenarFechas();
  }

  /**
   * Ordena las fechas programadas por fecha
   */
  private ordenarFechas(): void {
    this.fechasOrdenadas = [...this.fechasProgramadas].sort((a, b) => {
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });
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
