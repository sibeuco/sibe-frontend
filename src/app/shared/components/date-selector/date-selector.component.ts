import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FechaProgramada, EstadoFechaProgramada } from '../../model/fecha-programada.model';
import { Actividad } from '../../model/actividad.model';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit, OnChanges {
  @Input() actividad: Actividad | null = null;
  @Input() fechasProgramadas: FechaProgramada[] = [];
  @Output() verFecha = new EventEmitter<FechaProgramada>();
  @Output() cerrarModal = new EventEmitter<void>();

  fechasOrdenadas: FechaProgramada[] = [];

  constructor() { }

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
    this.verFecha.emit(fechaProgramada);
  }

  /**
   * Cierra el modal
   */
  cerrar(): void {
    this.cerrarModal.emit();
  }

  /**
   * Función para realizar el tracking de las fechas por ID
   */
  trackByFechaId(index: number, fecha: FechaProgramada): number {
    return fecha.id;
  }
}
