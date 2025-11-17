import { Component } from '@angular/core';
import { DepartmentService } from 'src/app/shared/service/department.service';
import { DepartmentDetailResponse } from 'src/app/shared/model/department.model';
import { AreaDetailResponse } from 'src/app/shared/model/area.model';
import { SubAreaDetailResponse } from 'src/app/shared/model/subarea.model';
import { ActivityDetailResponse } from 'src/app/shared/model/activity.model';
import { ActivityExecutionDetailResponse } from 'src/app/shared/model/activity-execution.model';
import { ParticipantResponse } from 'src/app/shared/model/participant.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home-primary-buttons',
  templateUrl: './home-primary-buttons.component.html',
  styleUrls: ['./home-primary-buttons.component.scss']
})
export class HomePrimaryButtonsComponent {

  private readonly NOMBRE_DIRECCION = 'Dirección de Bienestar y Evangelización';
  generandoExcel: boolean = false;

  constructor(private departmentService: DepartmentService) {}

  scrollToFilters(): void {
    const element = document.getElementById('home-filters-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  generarExcel(): void {
    if (this.generandoExcel) {
      return;
    }

    this.generandoExcel = true;

    // Primero obtener el identificador de la dirección por nombre
    this.departmentService.consultarPorNombre(this.NOMBRE_DIRECCION).subscribe({
      next: (department) => {
        // Luego obtener el detalle completo
        this.departmentService.consultarDetalle(department.identificador).subscribe({
          next: (detail) => {
            this.exportarAExcel(detail);
            this.generandoExcel = false;
          },
          error: (error) => {
            console.error('Error al obtener el detalle de la dirección:', error);
            alert('Error al obtener los datos de la dirección. Por favor, intente nuevamente.');
            this.generandoExcel = false;
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener la dirección:', error);
        alert('Error al obtener la dirección. Por favor, intente nuevamente.');
        this.generandoExcel = false;
      }
    });
  }

  private exportarAExcel(detail: DepartmentDetailResponse): void {
    const datos: any[] = [];

    // Procesar actividades directas de la dirección
    if (detail.actividades && detail.actividades.length > 0) {
      detail.actividades.forEach(actividad => {
        this.procesarActividad(actividad, detail.nombre, '', '', datos);
      });
    }

    // Procesar actividades de las áreas
    if (detail.areas && detail.areas.length > 0) {
      detail.areas.forEach((area: AreaDetailResponse) => {
        // Actividades directas del área
        if (area.actividades && area.actividades.length > 0) {
          area.actividades.forEach(actividad => {
            this.procesarActividad(actividad, detail.nombre, area.nombre, '', datos);
          });
        }

        // Actividades de las subáreas
        if (area.subareas && area.subareas.length > 0) {
          area.subareas.forEach((subarea: SubAreaDetailResponse) => {
            // El modelo dice que es un solo objeto ActivityDetailResponse, pero el JSON del backend devuelve un array
            // Manejar ambos casos
            if (subarea.actividades) {
              const actividadesArray = Array.isArray(subarea.actividades) 
                ? subarea.actividades 
                : [subarea.actividades];
              
              actividadesArray.forEach((actividad: ActivityDetailResponse) => {
                if (actividad && actividad.identificador) {
                  this.procesarActividad(actividad, detail.nombre, area.nombre, subarea.nombre, datos);
                }
              });
            }
          });
        }
      });
    }

    if (datos.length === 0) {
      alert('No se encontraron actividades para exportar.');
      return;
    }

    // Crear el libro de trabajo
    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Actividades');

    // Ajustar el ancho de las columnas según los nuevos campos
    const columnWidths = [
      { wch: 30 }, // Dirección Nombre
      { wch: 20 }, // Área Nombre
      { wch: 20 }, // Subárea Nombre
      { wch: 30 }, // Actividad Nombre
      { wch: 40 }, // Actividad Objetivo
      { wch: 10 }, // Actividad Semestre
      { wch: 12 }, // Actividad Fecha Creación
      { wch: 20 }, // Actividad Colaborador
      { wch: 20 }, // Indicador Nombre
      { wch: 15 }, // Tipo Indicador Naturaleza
      { wch: 15 }, // Tipo Indicador Tipología
      { wch: 15 }, // Temporalidad Nombre
      { wch: 15 }, // Proyecto Número
      { wch: 30 }, // Proyecto Nombre
      { wch: 40 }, // Proyecto Objetivo
      { wch: 30 }, // Públicos de Interés
      { wch: 12 }, // Ejecución Fecha Programada
      { wch: 12 }, // Ejecución Fecha Realización
      { wch: 12 }, // Ejecución Hora Inicio
      { wch: 12 }, // Ejecución Hora Fin
      { wch: 15 }, // Estado Nombre
      { wch: 40 }, // Participante Nombre Completo
      { wch: 15 }, // Participante Número Identificación
      { wch: 10 }, // Participante Tipo
      { wch: 15 }, // Participante Centro Costos Código
      { wch: 30 }, // Participante Centro Costos Descripción
      { wch: 12 }, // Participante Fecha Nacimiento
      { wch: 15 }, // Participante Nacionalidad
      { wch: 15 }, // Participante Estado Civil
      { wch: 30 }, // Participante Correo Personal
      { wch: 30 }, // Participante Correo Institucional
      { wch: 30 }, // Participante Programa Académico
      { wch: 20 }, // Participante Tipo Programa Académico
      { wch: 20 }, // Participante Facultad
      { wch: 10 }, // Participante Año Ingreso
      { wch: 12 }, // Participante Semestre Actual
      { wch: 10 }, // Participante Créditos Aprobados
      { wch: 10 }, // Participante Promedio General
      { wch: 15 }, // Participante Estado Académico
      { wch: 15 }, // Participante Modalidad Estudio
      { wch: 10 }, // Participante Tiempo Llegada Universidad
      { wch: 20 }  // Participante Medio Transporte
    ];
    ws['!cols'] = columnWidths;

    // Generar el archivo
    const fecha = new Date().toISOString().split('T')[0];
    const nombreArchivo = `Actividades_${detail.nombre.replace(/\s+/g, '_')}_${fecha}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
  }

  private procesarActividad(
    actividad: ActivityDetailResponse,
    direccionNombre: string,
    areaNombre: string,
    subareaNombre: string,
    datos: any[]
  ): void {
    // Si no hay fechas programadas, crear una fila sin fecha
    if (!actividad.fechasProgramadas || actividad.fechasProgramadas.length === 0) {
      const fila = this.crearFilaBase(actividad, direccionNombre, areaNombre, subareaNombre);
      datos.push(fila);
      return;
    }

    // Procesar cada fecha programada (ActivityExecutionDetailResponse)
    actividad.fechasProgramadas.forEach((ejecucion: ActivityExecutionDetailResponse) => {
      // Si no hay participantes, crear una fila sin participante
      if (!ejecucion.participantes || ejecucion.participantes.length === 0) {
        const fila = this.crearFilaBase(actividad, direccionNombre, areaNombre, subareaNombre);
        
        // ActivityExecutionDetailResponse
        fila['Ejecución Fecha Programada'] = ejecucion.fechaProgramada || '';
        fila['Ejecución Fecha Realización'] = ejecucion.fechaRealizacion || '';
        // Manejar ambos formatos: horaInicio/horaFin (del JSON) y HoraInicio/HoraFin (del modelo)
        fila['Ejecución Hora Inicio'] = (ejecucion as any).horaInicio || ejecucion.HoraInicio || '';
        fila['Ejecución Hora Fin'] = (ejecucion as any).horaFin || ejecucion.HoraFin || '';
        
        // ActivityStateResponse
        fila['Estado Nombre'] = ejecucion.estadoActividad?.nombre || '';
        
        datos.push(fila);
        return;
      }

      // Procesar cada participante (ParticipantResponse)
      ejecucion.participantes.forEach((participante: ParticipantResponse) => {
        const fila = this.crearFilaBase(actividad, direccionNombre, areaNombre, subareaNombre);
        
        // ActivityExecutionDetailResponse
        fila['Ejecución Fecha Programada'] = ejecucion.fechaProgramada || '';
        fila['Ejecución Fecha Realización'] = ejecucion.fechaRealizacion || '';
        // Manejar ambos formatos: horaInicio/horaFin (del JSON) y HoraInicio/HoraFin (del modelo)
        fila['Ejecución Hora Inicio'] = (ejecucion as any).horaInicio || ejecucion.HoraInicio || '';
        fila['Ejecución Hora Fin'] = (ejecucion as any).horaFin || ejecucion.HoraFin || '';
        
        // ActivityStateResponse
        fila['Estado Nombre'] = ejecucion.estadoActividad?.nombre || '';
        
        // ParticipantResponse - todos los campos del modelo
        fila['Participante Nombre Completo'] = participante.nombreCompleto || '';
        fila['Participante Número Identificación'] = participante.numeroIdentificacion || '';
        fila['Participante Tipo'] = participante.tipo || '';
        fila['Participante Centro Costos Código'] = participante.centroCostos?.codigo || '';
        fila['Participante Centro Costos Descripción'] = participante.centroCostos?.descripcion || '';
        fila['Participante Fecha Nacimiento'] = participante.fechaNacimiento || '';
        fila['Participante Nacionalidad'] = participante.nacionalidad || '';
        fila['Participante Estado Civil'] = participante.estadoCivil || '';
        fila['Participante Correo Personal'] = participante.correoPersonal || '';
        fila['Participante Correo Institucional'] = participante.correoInstitucional || '';
        fila['Participante Programa Académico'] = participante.programaAcademico || '';
        fila['Participante Tipo Programa Académico'] = participante.tipoProgramaAcademico || '';
        fila['Participante Facultad'] = participante.facultad || '';
        fila['Participante Año Ingreso'] = participante.annoIngreso || '';
        fila['Participante Semestre Actual'] = participante.semestreActual || '';
        fila['Participante Créditos Aprobados'] = participante.creditosAprobados || '';
        fila['Participante Promedio General'] = participante.promedioGeneral || '';
        fila['Participante Estado Académico'] = participante.estadoAcademico || '';
        fila['Participante Modalidad Estudio'] = participante.modalidadEstudio || '';
        fila['Participante Tiempo Llegada Universidad'] = participante.tiempoLlegadaUniversidad || '';
        fila['Participante Medio Transporte'] = participante.medioTransporte || '';
        
        datos.push(fila);
      });
    });
  }

  private crearFilaBase(actividad: ActivityDetailResponse, nombreDireccion: string, nombreArea: string, nombreSubarea: string): any {
    // Procesar públicos de interés
    const publicosInteres = actividad.indicador?.publicosInteres 
      ? actividad.indicador.publicosInteres.map((pi) => pi.nombre).join(', ')
      : '';

    return {
      // DepartmentDetailResponse
      'Dirección Nombre': nombreDireccion,
      
      // AreaDetailResponse / SubAreaDetailResponse
      'Área Nombre': nombreArea || '',
      'Subárea Nombre': nombreSubarea || '',
      
      // ActivityDetailResponse
      'Actividad Nombre': actividad.nombre || '',
      'Actividad Objetivo': actividad.objetivo || '',
      'Actividad Semestre': actividad.semestre || '',
      'Actividad Fecha Creación': actividad.fechaCreacion || '',
      'Actividad Colaborador': actividad.colaborador || '',
      
      // IndicatorResponse
      'Indicador Nombre': actividad.indicador?.nombre || '',
      
      // IndicatorTypeResponse
      'Tipo Indicador Naturaleza': actividad.indicador?.tipoIndicador?.naturalezaIndicador || '',
      'Tipo Indicador Tipología': actividad.indicador?.tipoIndicador?.tipologiaIndicador || '',
      
      // FrequencyResponse
      'Temporalidad Nombre': actividad.indicador?.temporalidad?.nombre || '',
      
      // ProjectResponse
      'Proyecto Número': actividad.indicador?.proyecto?.numeroProyecto || '',
      'Proyecto Nombre': actividad.indicador?.proyecto?.nombre || '',
      'Proyecto Objetivo': actividad.indicador?.proyecto?.objetivo || '',
      
      // InterestedPublicResponse (concatenado)
      'Públicos de Interés': publicosInteres,
      
      // ActivityExecutionDetailResponse
      'Ejecución Fecha Programada': '',
      'Ejecución Fecha Realización': '',
      'Ejecución Hora Inicio': '',
      'Ejecución Hora Fin': '',
      
      // ActivityStateResponse
      'Estado Nombre': '',
      
      // ParticipantResponse
      'Participante Nombre Completo': '',
      'Participante Número Identificación': '',
      'Participante Tipo': '',
      'Participante Centro Costos Código': '',
      'Participante Centro Costos Descripción': '',
      'Participante Fecha Nacimiento': '',
      'Participante Nacionalidad': '',
      'Participante Estado Civil': '',
      'Participante Correo Personal': '',
      'Participante Correo Institucional': '',
      'Participante Programa Académico': '',
      'Participante Tipo Programa Académico': '',
      'Participante Facultad': '',
      'Participante Año Ingreso': '',
      'Participante Semestre Actual': '',
      'Participante Créditos Aprobados': '',
      'Participante Promedio General': '',
      'Participante Estado Académico': '',
      'Participante Modalidad Estudio': '',
      'Participante Tiempo Llegada Universidad': '',
      'Participante Medio Transporte': ''
    };
  }

}
