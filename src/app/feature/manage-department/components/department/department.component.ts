import { Component, ViewChild } from '@angular/core';
import { UploadDatabaseComponent } from 'src/app/shared/components/upload-database/upload-database.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  @ViewChild('uploadDatabaseComponent') uploadDatabaseComponent!: UploadDatabaseComponent;

  /**
   * Abre el modal para cargar base de datos de empleados
   */
  abrirModalEmpleados() {
    this.uploadDatabaseComponent.abrirModal('empleados');
  }

  /**
   * Abre el modal para cargar base de datos de estudiantes
   */
  abrirModalEstudiantes() {
    this.uploadDatabaseComponent.abrirModal('estudiantes');
  }

  /**
   * Se ejecuta cuando se selecciona un archivo (mantiene compatibilidad)
   */
  onArchivoSeleccionado(archivo: File) {
    console.log('Archivo seleccionado:', archivo);
    console.log('Nombre:', archivo.name);
    console.log('Tamaño:', (archivo.size / (1024 * 1024)).toFixed(2), 'MB');
    console.log('Tipo:', archivo.type);
  }

  /**
   * Se ejecuta cuando la carga al backend se completa exitosamente
   */
  onCargaCompleta(respuesta: any) {
    console.log('Respuesta del servidor:', respuesta);
    // Aquí puedes:
    // - Actualizar una tabla de datos
    // - Mostrar un mensaje de éxito
    // - Recargar información
    // - etc.
  }

}
