import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { ProjectResponse } from '../../model/project.model';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit{

  searchTerm: string = '';
  proyectos: ProjectResponse[] = [];
  proyectosFiltrados: ProjectResponse[] = [];
  cargando: boolean = false;
  error: string = '';

  // Paginación
  paginaActual = 0;
  totalPaginas = 0;
  totalElementos = 0;
  tamanioPagina = 10;

  // Propiedades para el modal de edición
  proyectoSeleccionado: ProjectResponse | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.cargando = true;
    this.error = '';
    const busqueda = this.searchTerm?.trim() || undefined;

    this.projectService.consultarProyectosPaginado(this.paginaActual, this.tamanioPagina, busqueda).subscribe({
      next: (respuesta) => {
        this.proyectos = respuesta.contenido || [];
        this.proyectosFiltrados = [...this.proyectos];
        this.totalElementos = respuesta.totalElementos;
        this.totalPaginas = respuesta.totalPaginas;
        this.paginaActual = respuesta.paginaActual;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener proyectos:', err);
        this.error = 'No se pudieron cargar los proyectos.';
        this.cargando = false;
      }
    });
  }

  filterProjects(): void {
    this.paginaActual = 0;
    this.cargarProyectos();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.cargarProyectos();
  }

  // Métodos para el modal de edición
  abrirModalEdicion(proyecto: ProjectResponse): void {
    this.proyectoSeleccionado = proyecto;

    // Abrir el modal usando Bootstrap
    const modalElement = document.getElementById('edit-project-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  }

  onProyectoModificado(proyectoModificado: ProjectResponse): void {
    // Recargar todos los proyectos desde el backend
    this.cargarProyectos();

    // Cerrar el modal
    this.cerrarModal();
  }

  onProyectoCancelado(): void {
    this.cerrarModal();
  }

  private cerrarModal(): void {
    const modalElement = document.getElementById('edit-project-modal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.proyectoSeleccionado = null;
  }
}
