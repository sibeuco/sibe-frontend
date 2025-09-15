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
            fechaProgramada: '',
            areaPertenece: ''
          };

          // Lista de indicadores para el select
          indicadores: Indicador[] = [];
          indicadorSeleccionado: string = '';

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
              fechaProgramada: '',
              areaPertenece: ''
            };
            this.indicadorSeleccionado = '';
          }

}
