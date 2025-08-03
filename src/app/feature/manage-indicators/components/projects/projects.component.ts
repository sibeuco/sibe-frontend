import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit{
  
  searchTerm: string = '';
  proyectos = [
    { numeroProyecto: 'proyecto 1', nombre: 'educación para la vida', objetivo: 'educar' },
    { numeroProyecto: 'proyecto 2', nombre: 'Más allá de la educación', objetivo: 'Ayudar a la mejora institucional' },
    { numeroProyecto: 'proyecto 7', nombre: 'más energía', objetivo: 'Pausas activas para mejorar el bienestar' }
  ];
  proyectosFiltrados = [...this.proyectos];

  ngOnInit(): void {
    this.proyectosFiltrados = this.proyectos;
  }

  filterProjects(): void {
    const term = this.searchTerm.toLowerCase();
    this.proyectosFiltrados = this.proyectos.filter(project =>
      Object.values(project).some(value =>
        value.toLowerCase().includes(term)
      )
    );
  }
}
