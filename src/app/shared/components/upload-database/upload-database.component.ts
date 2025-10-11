import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-upload-database',
  templateUrl: './upload-database.component.html',
  styleUrls: ['./upload-database.component.scss']
})
export class UploadDatabaseComponent {
  @Output() archivoSeleccionado = new EventEmitter<File>();

  archivoActual: File | null = null;
  nombreArchivo: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';
  
  // Configuracion de validaciones
  private readonly TAMANO_MAXIMO_MB = 40;
  private readonly TAMANO_MAXIMO_BYTES = this.TAMANO_MAXIMO_MB * 1024 * 1024;
  private readonly EXTENSIONES_PERMITIDAS = ['.xlsx', '.xls'];
  private readonly TIPOS_MIME_PERMITIDOS = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel' // .xls
  ];

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

  cargarArchivo() {
    if (!this.archivoActual) {
      this.mensajeError = 'Por favor selecciona un archivo primero';
      return;
    }

    // Emitir el archivo al componente padre
    this.archivoSeleccionado.emit(this.archivoActual);
    
    this.mensajeExito = 'Archivo cargado exitosamente';
    
    // Cerrar el modal después de un breve delay
    setTimeout(() => {
      this.cerrarModal();
      this.limpiarFormulario();
    }, 1500);
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
}
