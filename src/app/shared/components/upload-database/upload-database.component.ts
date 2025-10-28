import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';
import { UploadDatabaseService } from '../../service/upload-database.service';

/**
 * Componente para cargar archivos Excel de empleados o estudiantes al servidor.
 * Los archivos se envían automáticamente al backend mediante el servicio UploadDatabaseService.
 */
@Component({
  selector: 'app-upload-database',
  templateUrl: './upload-database.component.html',
  styleUrls: ['./upload-database.component.scss']
})
export class UploadDatabaseComponent {
  @Output() archivoSeleccionado = new EventEmitter<File>();
  @Output() cargaCompleta = new EventEmitter<any>(); // Emite la respuesta del backend

  archivoActual: File | null = null;
  nombreArchivo: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';
  cargando: boolean = false; // Indica si se está subiendo el archivo
  tipoBaseDatos: 'empleados' | 'estudiantes' = 'empleados'; // Tipo de base de datos a cargar
  
  // Configuracion de validaciones
  private readonly TAMANO_MAXIMO_MB = 40;
  private readonly TAMANO_MAXIMO_BYTES = this.TAMANO_MAXIMO_MB * 1024 * 1024;
  private readonly EXTENSIONES_PERMITIDAS = ['.xlsx', '.xls'];
  private readonly TIPOS_MIME_PERMITIDOS = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel' // .xls
  ];

  constructor(private uploadService: UploadDatabaseService) { }

  onFileSelected(event: any) {
    this.mensajeError = '';
    this.mensajeExito = '';
    
    const archivo: File = event.target.files[0];
    
    if (archivo) {
      // Validar que sea un archivo
      if (!archivo.name) {
        this.mensajeError = 'Por favor selecciona un archivo válido';
        this.limpiarSeleccion();
        return;
      }

      // Validar extensión del archivo
      const extension = this.obtenerExtension(archivo.name);
      if (!this.EXTENSIONES_PERMITIDAS.includes(extension)) {
        this.mensajeError = `Solo se permiten archivos de Excel (${this.EXTENSIONES_PERMITIDAS.join(', ')})`;
        this.limpiarSeleccion();
        return;
      }

      // Validar tipo MIME
      if (!this.TIPOS_MIME_PERMITIDOS.includes(archivo.type)) {
        this.mensajeError = 'El archivo seleccionado no es un archivo de Excel válido';
        this.limpiarSeleccion();
        return;
      }

      // Validar tamano
      if (archivo.size > this.TAMANO_MAXIMO_BYTES) {
        this.mensajeError = `El archivo es demasiado grande. Tamano maximo: ${this.TAMANO_MAXIMO_MB}MB`;
        this.limpiarSeleccion();
        return;
      }

      // Archivo válido
      this.archivoActual = archivo;
      this.nombreArchivo = archivo.name;
      this.mensajeExito = 'Archivo seleccionado correctamente';
    }
  }

  /**
   * Abre el modal para cargar base de datos
   * @param tipo Tipo de base de datos: 'empleados' o 'estudiantes'
   */
  abrirModal(tipo: 'empleados' | 'estudiantes') {
    this.tipoBaseDatos = tipo;
    this.limpiarFormulario();
    const modalElement = document.getElementById('upload-database-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  cargarArchivo() {
    if (!this.archivoActual) {
      this.mensajeError = 'Por favor selecciona un archivo primero';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';


    // Enviar el archivo al backend con el tipo de base de datos
    this.uploadService.subirArchivo(this.archivoActual, this.tipoBaseDatos).subscribe({
      next: (respuesta) => {
        this.cargando = false;
        
        // Mostrar mensaje de éxito del backend o mensaje por defecto
        if (respuesta && respuesta.mensaje) {
          this.mensajeExito = respuesta.mensaje;
        } else if (respuesta && respuesta.message) {
          this.mensajeExito = respuesta.message;
        } else {
          this.mensajeExito = 'Archivo cargado exitosamente en la base de datos';
        }
        
        // Emitir el archivo al componente padre (por compatibilidad)
        this.archivoSeleccionado.emit(this.archivoActual!);
        
        // Emitir la respuesta del backend
        this.cargaCompleta.emit(respuesta);
        
        // Cerrar el modal después de un breve delay
        setTimeout(() => {
          this.cerrarModal();
          this.limpiarFormulario();
        }, 2000);
      },
      error: (error) => {
        this.cargando = false;
        
        // Manejar diferentes tipos de errores con mensajes del backend
        if (error.status === 0) {
          this.mensajeError = 'No se pudo conectar con el servidor';
        } else if (error.status === 400) {
          this.mensajeError = error.error?.mensaje || error.error?.message || 'Error en la validación del archivo';
        } else if (error.status === 401) {
          this.mensajeError = 'No tienes autorización para realizar esta acción';
        } else if (error.status === 403) {
          this.mensajeError = 'Acceso denegado para esta operación';
        } else if (error.status === 500) {
          this.mensajeError = error.error?.mensaje || error.error?.message || 'Error del servidor al procesar el archivo';
        } else {
          this.mensajeError = error.error?.mensaje || error.error?.message || 'Error al cargar el archivo al servidor';
        }
      }
    });
  }

  eliminarArchivo() {
    this.limpiarSeleccion();
    this.mensajeError = '';
    this.mensajeExito = 'Archivo eliminado';
  }

  private obtenerExtension(nombreArchivo: string): string {
    return nombreArchivo.substring(nombreArchivo.lastIndexOf('.')).toLowerCase();
  }

  private limpiarSeleccion() {
    this.archivoActual = null;
    this.nombreArchivo = '';
    // Limpiar el input file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private limpiarFormulario() {
    this.limpiarSeleccion();
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  private cerrarModal() {
    const modalElement = document.getElementById('upload-database-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
  }

  obtenerTamanoArchivo(): string {
    if (!this.archivoActual) return '';
    const tamanoMB = (this.archivoActual.size / (1024 * 1024)).toFixed(2);
    return `${tamanoMB} MB`;
  }

  obtenerTituloModal(): string {
    return this.tipoBaseDatos === 'empleados' 
      ? 'Cargar Base de Datos de Empleados' 
      : 'Cargar Base de Datos de Estudiantes';
  }

  obtenerDescripcionModal(): string {
    return this.tipoBaseDatos === 'empleados'
      ? 'Selecciona un archivo de Excel (.xlsx o .xls) para cargar la base de datos del personal universitario'
      : 'Selecciona un archivo de Excel (.xlsx o .xls) para cargar la base de datos de estudiantes';
  }
}
