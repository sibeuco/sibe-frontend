import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Modal } from 'bootstrap';
import { ProjectService } from '../../service/project.service';
import { ProjectResponse } from '../../model/project.model';
import { FrequencyService } from '../../service/frequency.service';
import { FrequencyResponse } from '../../model/frequency.model';
import { IndicatorTypeResponse } from '../../model/indicator-type.model';
import { IndicatorTypeService } from '../../service/indicator-type.service';
import { InterestedPublicResponse } from '../../model/interested-public.model';
import { InterestedPublicService } from '../../service/interested-public.service';

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

      proyectos: ProjectResponse[] = [];
      cargandoProyectos: boolean = false;

      temporalidades: FrequencyResponse[] = [];
      cargandoTemporalidades: boolean = false;

      tiposIndicador: IndicatorTypeResponse[] = [];
      cargandoTiposIndicador: boolean = false;

      publicoInteres: InterestedPublicResponse[] = [];
      cargandoPublicoInteres: boolean = false;

      constructor(
        private projectService: ProjectService,
        private frequencyService: FrequencyService,
        private indicatorTypeService: IndicatorTypeService,
        private interestedPublicService: InterestedPublicService
      ) {}

      ngOnInit(): void {
        this.cargarProyectos();
        this.cargarTemporalidades();
        this.cargarTiposIndicador();
        this.cargarPublicoInteres();
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

      cargarTemporalidades(): void {
        this.cargandoTemporalidades = true;
        this.frequencyService.consultarTemporalidades().subscribe({
          next: (temporalidades: FrequencyResponse[]) => {
            this.temporalidades = temporalidades;
            this.cargandoTemporalidades = false;
          },
          error: (error) => {
            console.error('Error al cargar las temporalidades:', error);
            this.cargandoTemporalidades = false;
          }
        });
      }

      cargarTiposIndicador(): void {
        this.cargandoTiposIndicador = true;
        this.indicatorTypeService.consultarTiposIndicador().subscribe({
          next: (tiposIndicador: IndicatorTypeResponse[]) => {
            this.tiposIndicador = tiposIndicador;
            this.cargandoTiposIndicador = false;
          },
          error: (error) => {
            console.error('Error al cargar los tipos de indicador:', error);
            this.cargandoTiposIndicador = false;
          }
        });
      }

      cargarPublicoInteres(): void {
        this.cargandoPublicoInteres = true;
        this.interestedPublicService.consultarPublicoInteres().subscribe({
          next: (publicoInteres: InterestedPublicResponse[]) => {
            this.publicoInteres = publicoInteres;
            this.cargandoPublicoInteres = false;
          },
          error: (error) => {
            console.error('Error al cargar el público de interés:', error);
            this.cargandoPublicoInteres = false;
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
