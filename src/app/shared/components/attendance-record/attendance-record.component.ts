import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Participante, AsistenciaActividad } from 'src/app/core/model/participante.model';
import { Modal } from 'bootstrap';
import { UniversityMemberService } from '../../service/university-member.service';
import { UniversityMemberResponse } from '../../model/university-member.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-attendance-record',
  templateUrl: './attendance-record.component.html',
  styleUrls: ['./attendance-record.component.scss']
})
export class AttendanceRecordComponent implements OnInit {
  
  @Input() idActividad: number = 0;
  @Input() actividad: any = null; // Datos de la actividad
  @Input() usuarioLoggeado: any = null; // Usuario actualmente loggeado
  @Output() actividadFinalizada = new EventEmitter<any>();
  @Output() actividadCancelada = new EventEmitter<any>();

  // Variables del formulario
  rfidSearch: string = '';
  documentoSearch: string = '';
  
  // Variables de estado
  buscando: boolean = false;
  guardando: boolean = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | 'warning' = 'success';
  actividadIniciada: boolean = false;
  
  // Lista de participantes
  miembrosAsistencia: UniversityMemberResponse[] = [];

  constructor(private universityMemberService: UniversityMemberService) {}

  ngOnInit(): void {
    this.limpiarMensaje();
  }

  iniciarActividad(): void {
    this.actividadIniciada = true;
    this.limpiarMensaje();
    this.mostrarMensaje('La actividad fue iniciada. Puedes registrar la asistencia.', 'success');
  }

  /**
   * Carga datos de prueba para testing
   */
  /**
   * Busca un participante por RFID o documento (usando datos mock)
   */
  buscarParticipante(): void {
    if (!this.rfidSearch && !this.documentoSearch) {
      this.mostrarMensaje('Por favor ingrese un código RFID o número de documento', 'warning');
      return;
    }

    this.buscando = true;
    this.limpiarMensaje();

    const carnet = this.rfidSearch?.trim();
    const documento = this.documentoSearch?.trim();

    const consulta$ = carnet
      ? this.universityMemberService.consultarPorCarnet(carnet)
      : this.universityMemberService.consultarPorIdentificacion(documento);

    consulta$
      .pipe(
        catchError(() => {
          this.buscando = false;
          this.preguntarAgregarParticipanteExterno();
          return of(null);
        })
      )
      .subscribe(miembro => {
        this.buscando = false;
        if (miembro) {
          this.agregarMiembro(miembro);
          this.limpiarFormulario();
        } else {
          this.mostrarMensaje('No se encontró ningún miembro con los datos ingresados.', 'warning');
        }
      });
  }

  /**
   * Pregunta al usuario si desea agregar un participante externo
   */
  private preguntarAgregarParticipanteExterno(): void {
    const modalElement = document.getElementById('confirmExternalParticipantModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  /**
   * Confirma agregar participante externo
   */
  confirmarAgregarParticipanteExterno(): void {
    const modalElement = document.getElementById('confirmExternalParticipantModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.abrirModalParticipanteExterno();
  }

  /**
   * Cancela agregar participante externo
   */
  cancelarAgregarParticipanteExterno(): void {
    const modalElement = document.getElementById('confirmExternalParticipantModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.mostrarMensaje('No se encontró ningún participante con los datos ingresados', 'warning');
    this.limpiarFormulario();
  }

  /**
   * Abre el modal de participante externo
   */
  private abrirModalParticipanteExterno(): void {
    const modalElement = document.getElementById('external-participant-modal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  /**
   * Maneja el evento cuando se agrega un participante externo
   */
  manejarParticipanteExterno(datos: any): void {
    const miembroExterno: UniversityMemberResponse = {
      identificador: `externo-${Date.now()}`,
      nombreCompleto: datos.nombreCompleto,
      documentoIdentificacion: datos.documento,
      programaAcademico: 'N/A',
      correoInstitucional: 'N/A',
      tipo: 'Externo'
    };

    this.agregarMiembro(miembroExterno);
    this.limpiarFormulario();
    this.mostrarMensaje(`Participante externo ${datos.nombreCompleto} agregado exitosamente`, 'success');
  }

  /**
   * Agrega un participante a la lista de asistencia
   */
  private agregarMiembro(miembro: UniversityMemberResponse): void {
    const yaExiste = this.miembrosAsistencia.some(existing =>
      existing.documentoIdentificacion === miembro.documentoIdentificacion ||
      existing.identificador === miembro.identificador
    );

    if (yaExiste) {
      this.mostrarMensaje('Este participante ya está registrado en la lista de asistencia', 'warning');
      return;
    }

    this.miembrosAsistencia.push(miembro);
    this.mostrarMensaje(`Participante ${miembro.nombreCompleto} agregado exitosamente`, 'success');
  }

  /**
   * Remueve un participante de la lista de asistencia
   */
  removerParticipante(index: number): void {
    const participante = this.miembrosAsistencia[index];
    this.miembrosAsistencia.splice(index, 1);
    this.mostrarMensaje(`Participante ${participante.nombreCompleto} removido de la lista`, 'success');
  }

  /**
   * Finaliza la actividad y guarda la asistencia
   */
  finalizarActividad(): void {
    if (this.miembrosAsistencia.length === 0) {
      this.mostrarMensaje('No hay participantes registrados para finalizar la actividad', 'warning');
      return;
    }

    this.guardando = true;
    this.limpiarMensaje();

    // Simular delay de guardado
    setTimeout(() => {
      this.guardando = false;

      // Crear la lista de asistencias
      const asistencias: AsistenciaActividad[] = this.miembrosAsistencia.map((miembro, index) => {
        const participante = this.convertirAModeloParticipante(miembro, index);
        return {
          idActividad: this.idActividad,
          idParticipante: participante.id ?? index + 1,
          fechaAsistencia: new Date(),
          participante
        };
      });

      // Simular guardado exitoso
      console.log('Asistencias a guardar:', asistencias);
      this.mostrarMensaje('Asistencia guardada exitosamente', 'success');

      // Emitir evento de actividad finalizada
      this.actividadFinalizada.emit({
        idActividad: this.idActividad,
        participantes: this.miembrosAsistencia,
        fechaFinalizacion: new Date(),
        asistencias: asistencias
      });

      // Limpiar el componente
      this.limpiarTodo();
    }, 1500); // Simular 1.5 segundos de guardado
  }

  /**
   * Cancela la actividad
   */
  cancelarActividad(): void {
    this.actividadCancelada.emit({
      idActividad: this.idActividad,
      participantes: this.miembrosAsistencia
    });
    this.limpiarTodo();
  }

  /**
   * Limpia el formulario de búsqueda
   */
  private limpiarFormulario(): void {
    this.rfidSearch = '';
    this.documentoSearch = '';
  }

  /**
   * Limpia todos los datos del componente
   */
  private limpiarTodo(): void {
    this.limpiarFormulario();
    this.miembrosAsistencia = [];
    this.limpiarMensaje();
  }

  /**
   * Muestra un mensaje al usuario
   */
  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'warning'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      this.limpiarMensaje();
    }, 5000);
  }

  private limpiarMensaje(): void {
    this.mensaje = '';
  }

  /**
   * Verifica si la actividad está finalizada
   */
  esActividadFinalizada(): boolean {
    return this.actividad?.estado === 'FINALIZADA';
  }

  private convertirAModeloParticipante(miembro: UniversityMemberResponse, index: number): Participante {
    return {
      id: index + 1,
      tipoIdentificacion: '',
      documento: miembro.documentoIdentificacion,
      primerNombre: miembro.nombreCompleto,
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      correo: miembro.correoInstitucional || '',
      tipoUsuario: miembro.tipo || 'Miembro'
    };
  }
}
