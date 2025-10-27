import { Component, OnInit } from '@angular/core';
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

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.cargando = true;
    this.projectService.consultarProyectos().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.proyectosFiltrados = [...this.proyectos];
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
    const term = this.searchTerm.toLowerCase();
    this.proyectosFiltrados = this.proyectos.filter(project =>
      Object.values(project).some(value =>
        String(value).toLowerCase().includes(term)
      )
    );
  }
}
