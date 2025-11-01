import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { IndicatorsService, Indicador } from 'src/app/feature/manage-indicators/service/indicators.service';

@Component({
  selector: 'app-register-new-activity',
  templateUrl: './register-new-activity.component.html',
  styleUrls: ['./register-new-activity.component.scss']
})
export class RegisterNewActivityComponent implements OnInit {

  @Output() actividadCreada = new EventEmitter<any>();
        
          actividad = {
            nombre: '',
            objetivo: '',
            semestre: '',
            rutaInsumos: '',
            indicador: '',
            colaborador: '',
            fechasProgramadas: [] as string[],
          };

          // Lista de indicadores para el select
          indicadores: Indicador[] = [];
          indicadorSeleccionado: string = '';
          
          // Fecha temporal para agregar
          fechaTemporal: string = '';
          errorFecha: string = '';

          constructor(private indicatorsService: IndicatorsService) {}

          ngOnInit(): void {
            this.cargarIndicadores();
          }

          // Método para cargar los indicadores desde el servicio
          cargarIndicadores(): void {
            // Por ahora usamos datos mock, cuando esté la API se puede cambiar a:
            // this.indicatorsService.obtenerIndicadores().subscribe(response => {
            //   this.indicadores = response.data;
            // });
            this.indicadores = this.indicatorsService.obtenerIndicadoresMock();
          }

          // Agregar fecha a la lista
          agregarFecha() {
            this.errorFecha = '';

            if (!this.fechaTemporal) {
              this.errorFecha = 'Por favor seleccione una fecha';
              return;
            }

            // Verificar si la fecha ya existe en la lista
            if (this.actividad.fechasProgramadas.includes(this.fechaTemporal)) {
              this.errorFecha = 'Esta fecha ya está agregada';
              return;
            }

            // Agregar la fecha a la lista
            this.actividad.fechasProgramadas.push(this.fechaTemporal);
            
            // Limpiar el campo temporal
            this.fechaTemporal = '';
          }

          // Eliminar fecha de la lista
          eliminarFecha(index: number) {
            this.actividad.fechasProgramadas.splice(index, 1);
            this.errorFecha = '';
          }

          // TrackBy para optimizar el *ngFor
          trackByIndex(index: number): number {
            return index;
          }
        
          registrarActividad() {
            this.actividadCreada.emit(this.actividad);
            this.limpiarFormulario();
        
            const modalElement = document.getElementById('userModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
          modal.hide();
        }
          }
        
          limpiarFormulario() {
            this.actividad = {
              nombre: '',
              objetivo: '',
              semestre: '',
              rutaInsumos: '',
              indicador: '',
              colaborador: '',
              fechasProgramadas: [],
            };
            this.indicadorSeleccionado = '';
            this.fechaTemporal = '';
            this.errorFecha = '';
          }

}
