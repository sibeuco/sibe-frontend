import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Participante, AsistenciaActividad } from 'src/app/core/model/participante.model';
import { Modal } from 'bootstrap';

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
  mostrarDatosPrueba: boolean = false;
  
  // Lista de participantes
  participantesAsistencia: Participante[] = [];

  private participantesMock: Participante[] = [
    {
      id: 1,
      tipoIdentificacion: 'CC',
      documento: '1036965847',
      primerNombre: 'Daniel',
      segundoNombre: 'Felipe',
      primerApellido: 'Garcia',
      segundoApellido: 'Quiceno',
      correo: 'daniel.garcia5847@gmail.com',
      rfid: '0058844276',
      tipoUsuario: 'Estudiante'
    },
    {
      id: 2,
      tipoIdentificacion: 'CC',
      documento: '1036945983',
      primerNombre: 'Erika',
      segundoNombre: 'Fernanda',
      primerApellido: 'Torres',
      segundoApellido: 'Marin',
      correo: 'egresado.jefe@uco.edu.co',
      rfid: '3620660411',
      tipoUsuario: 'Estudiante'
    },
    {
      id: 3,
      tipoIdentificacion: 'TI',
      documento: 'TI123456',
      primerNombre: 'Carlos',
      segundoNombre: 'Alberto',
      primerApellido: 'González',
      segundoApellido: 'Martínez',
      correo: 'carlos.gonzalez@email.com',
      rfid: 'RF009012',
      tipoUsuario: 'Estudiante'
    },
    {
      id: 4,
      tipoIdentificacion: 'CC',
      documento: '11223344',
      primerNombre: 'Ana',
      segundoNombre: 'Sofía',
      primerApellido: 'Hernández',
      segundoApellido: 'Díaz',
      correo: 'ana.hernandez@email.com',
      rfid: 'RF003456',
      tipoUsuario: 'Estudiante'
    },
    {
      id: 5,
      tipoIdentificacion: 'CC',
      documento: '55667788',
      primerNombre: 'Luis',
      segundoNombre: 'Fernando',
      primerApellido: 'Morales',
      segundoApellido: 'Castro',
      correo: 'luis.morales@email.com',
      rfid: 'RF007890',
      tipoUsuario: 'Estudiante'
    },
    {
      id: 6,
      tipoIdentificacion: 'CC',
      documento: '99887766',
      primerNombre: 'Laura',
      segundoNombre: 'Isabel',
      primerApellido: 'Jiménez',
      segundoApellido: 'Ruiz',
      correo: 'laura.jimenez@email.com',
      rfid: 'RF001122',
      tipoUsuario: 'Estudiante'
    },
    {
      id: 7,
      tipoIdentificacion: 'TI',
      documento: 'TI789012',
      primerNombre: 'Diego',
      segundoNombre: 'Alejandro',
      primerApellido: 'Vargas',
      segundoApellido: 'Ramírez',
      correo: 'diego.vargas@email.com',
      rfid: 'RF004567',
      tipoUsuario: 'Estudiante'
    },
    {
      id: 8,
      tipoIdentificacion: 'CC',
      documento: '33445566',
      primerNombre: 'Sandra',
      segundoNombre: 'Patricia',
      primerApellido: 'Torres',
      segundoApellido: 'Flores',
      correo: 'sandra.torres@email.com',
      rfid: 'RF008901',
      tipoUsuario: 'Estudiante'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.limpiarMensaje();
    this.cargarDatosPrueba();
  }

  /**
   * Carga datos de prueba para testing
   */
  private cargarDatosPrueba(): void {
    // Datos de actividad de prueba
    if (!this.actividad) {
      this.actividad = {
        id: 1,
        nombre: 'Taller de Bienestar Estudiantil',
        colaborador: 'María González Pérez',
        estado: 'EN_CURSO', // Cambiar a 'FINALIZADA' para probar el otro caso
        objetivo: 'Promover el bienestar integral de los estudiantes',
        indicador: 'Satisfacción grupos de Interés - eficacia',
        fechaProgramada: '2024-12-25'
      };
    }

    // Datos de usuario loggeado de prueba
    if (!this.usuarioLoggeado) {
      this.usuarioLoggeado = {
        id: 1,
        nombreCompleto: 'María González Pérez', // Coincide con el colaborador
        email: 'maria.gonzalez@email.com',
        documento: '1036965847',
        tipoUsuario: 'Colaborador'
      };
    }

    // Cargar algunos participantes de prueba si la actividad está finalizada
    if (this.esActividadFinalizada()) {
      this.participantesAsistencia = [
        {
          id: 1,
          tipoIdentificacion: 'CC',
          documento: '1036965847',
          primerNombre: 'Daniel',
          segundoNombre: 'Felipe',
          primerApellido: 'Garcia',
          segundoApellido: 'Quiceno',
          correo: 'daniel.garcia5847@gmail.com',
          rfid: '0058844276',
          tipoUsuario: 'Estudiante'
        },
        {
          id: 2,
          tipoIdentificacion: 'CC',
          documento: '87654321',
          primerNombre: 'María',
          segundoNombre: 'Elena',
          primerApellido: 'Rodríguez',
          segundoApellido: 'López',
          correo: 'maria.rodriguez@email.com',
          rfid: 'RF005678',
          tipoUsuario: 'Estudiante'
        },
        {
          id: 3,
          tipoIdentificacion: 'TI',
          documento: 'TI123456',
          primerNombre: 'Carlos',
          segundoNombre: 'Alberto',
          primerApellido: 'González',
          segundoApellido: 'Martínez',
          correo: 'carlos.gonzalez@email.com',
          rfid: 'RF009012',
          tipoUsuario: 'Estudiante'
        }
      ];
    }
  }

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

    // Simular delay de búsqueda
    setTimeout(() => {
      this.buscando = false;
      
      // Buscar en los datos mock
      const participanteEncontrado = this.participantesMock.find(p => 
        (this.rfidSearch && p.rfid?.toLowerCase() === this.rfidSearch.toLowerCase()) ||
        (this.documentoSearch && p.documento.toLowerCase() === this.documentoSearch.toLowerCase())
      );

      if (participanteEncontrado) {
        this.agregarParticipante(participanteEncontrado);
        this.limpiarFormulario();
      } else {
        // Preguntar si desea agregar como participante externo
        this.preguntarAgregarParticipanteExterno();
      }
    }, 1000); // Simular 1 segundo de búsqueda
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
    // Crear un objeto Participante a partir de los datos del participante externo
    const participanteExterno: Participante = {
      id: Date.now(), // Generar un ID temporal
      tipoIdentificacion: 'EXT', // Tipo para identificar participantes externos
      documento: datos.documento,
      primerNombre: datos.nombreCompleto.split(' ')[0] || datos.nombreCompleto,
      segundoNombre: datos.nombreCompleto.split(' ')[1] || '',
      primerApellido: datos.nombreCompleto.split(' ')[2] || '',
      segundoApellido: datos.nombreCompleto.split(' ')[3] || '',
      correo: 'participante.externo@email.com', // Correo genérico para externos
      rfid: this.rfidSearch || undefined,
      tipoUsuario: 'Externo'
    };

    // Agregar el participante externo a la lista
    this.agregarParticipante(participanteExterno);
    this.limpiarFormulario();
    this.mostrarMensaje(`Participante externo ${datos.nombreCompleto} agregado exitosamente`, 'success');
  }

  /**
   * Agrega un participante a la lista de asistencia
   */
  private agregarParticipante(participante: Participante): void {
    // Verificar si el participante ya está en la lista
    const yaExiste = this.participantesAsistencia.some(p => 
      p.documento === participante.documento || p.rfid === participante.rfid
    );

    if (yaExiste) {
      this.mostrarMensaje('Este participante ya está registrado en la lista de asistencia', 'warning');
      return;
    }

    this.participantesAsistencia.push(participante);
    this.mostrarMensaje(`Participante ${this.getNombreCompleto(participante)} agregado exitosamente`, 'success');
  }

  /**
   * Remueve un participante de la lista de asistencia
   */
  removerParticipante(index: number): void {
    const participante = this.participantesAsistencia[index];
    this.participantesAsistencia.splice(index, 1);
    this.mostrarMensaje(`Participante ${this.getNombreCompleto(participante)} removido de la lista`, 'success');
  }

  /**
   * Finaliza la actividad y guarda la asistencia (usando datos mock)
   */
  finalizarActividad(): void {
    if (this.participantesAsistencia.length === 0) {
      this.mostrarMensaje('No hay participantes registrados para finalizar la actividad', 'warning');
      return;
    }

    this.guardando = true;
    this.limpiarMensaje();

    // Simular delay de guardado
    setTimeout(() => {
      this.guardando = false;
      
      // Crear la lista de asistencias
      const asistencias: AsistenciaActividad[] = this.participantesAsistencia.map(participante => ({
        idActividad: this.idActividad,
        idParticipante: participante.id!,
        fechaAsistencia: new Date(),
        participante: participante
      }));

      // Simular guardado exitoso
      console.log('Asistencias a guardar:', asistencias);
      this.mostrarMensaje('Asistencia guardada exitosamente', 'success');
      
      // Emitir evento de actividad finalizada
      this.actividadFinalizada.emit({
        idActividad: this.idActividad,
        participantes: this.participantesAsistencia,
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
      participantes: this.participantesAsistencia
    });
    this.limpiarTodo();
  }

  /**
   * Obtiene el nombre completo del participante
   */
  getNombreCompleto(participante: Participante): string {
    const nombre = `${participante.primerNombre} ${participante.segundoNombre || ''}`.trim();
    const apellido = `${participante.primerApellido} ${participante.segundoApellido || ''}`.trim();
    return `${nombre} ${apellido}`.trim();
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
    this.participantesAsistencia = [];
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

  /**
   * Verifica si el usuario loggeado es el colaborador de la actividad
   */
  esColaboradorActividad(): boolean {
    if (!this.actividad || !this.usuarioLoggeado) {
      return false;
    }
    // Comparar por documento o email del colaborador
    return this.actividad.colaborador === this.usuarioLoggeado.nombreCompleto ||
           this.actividad.colaborador === this.usuarioLoggeado.email ||
           this.actividad.colaborador === this.usuarioLoggeado.documento;
  }

  /**
   * Verifica si se debe mostrar el formulario de asistencia
   */
  debeMostrarFormularioAsistencia(): boolean {
    return !this.esActividadFinalizada() && this.esColaboradorActividad();
  }

  /**
   * Verifica si se debe mostrar solo la lista de participantes
   */
  debeMostrarSoloLista(): boolean {
    return this.esActividadFinalizada();
  }

  /**
   * Verifica si se debe mostrar mensaje de acceso denegado
   */
  debeMostrarAccesoDenegado(): boolean {
    return !this.esActividadFinalizada() && !this.esColaboradorActividad();
  }

  /**
   * Método para cambiar el escenario de prueba
   * Útil para testing de diferentes casos
   */
  cambiarEscenarioPrueba(escenario: 'finalizada' | 'en_curso_colaborador' | 'en_curso_no_colaborador'): void {
    switch (escenario) {
      case 'finalizada':
        this.actividad.estado = 'FINALIZADA';
        this.usuarioLoggeado.nombreCompleto = 'María González Pérez';
        break;
      case 'en_curso_colaborador':
        this.actividad.estado = 'EN_CURSO';
        this.usuarioLoggeado.nombreCompleto = 'María González Pérez';
        break;
      case 'en_curso_no_colaborador':
        this.actividad.estado = 'EN_CURSO';
        this.usuarioLoggeado.nombreCompleto = 'Juan Pérez'; // Diferente al colaborador
        break;
    }
    
    // Recargar datos de prueba
    this.cargarDatosPrueba();
  }

}
