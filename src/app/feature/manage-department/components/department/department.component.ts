import { Component } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {

  onArchivoSeleccionado(archivo: File) {
    console.log('Archivo seleccionado:', archivo);
    console.log('Nombre:', archivo.name);
    console.log('Tamaño:', (archivo.size / (1024 * 1024)).toFixed(2), 'MB');
    console.log('Tipo:', archivo.type);
    
    // TODO: Aquí puedes enviar el archivo al backend
    // Ejemplo:
    // const formData = new FormData();
    // formData.append('file', archivo);
    // this.tuServicio.cargarBaseDatos(formData).subscribe(
    //   response => {
    //     console.log('Base de datos cargada exitosamente', response);
    //   },
    //   error => {
    //     console.error('Error al cargar la base de datos', error);
    //   }
    // );
  }

}
