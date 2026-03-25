import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { environment } from 'src/environments/environment';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('should call GET to consult projects', () => {
    service.consultarProyectos().subscribe();
    const req = httpMock.expectOne(r => r.url === `${environment.endpoint}/proyectos`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call POST to add a new project', () => {
    const proyecto = { nombre: 'Test' } as any;
    service.agregarNuevoProyecto(proyecto).subscribe();
    const req = httpMock.expectOne(r => r.url === `${environment.endpoint}/proyectos`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call PUT to modify a project', () => {
    const proyecto = { nombre: 'Updated' } as any;
    service.modificarProyecto('123', proyecto).subscribe();
    const req = httpMock.expectOne(r => r.url === `${environment.endpoint}/proyectos/123`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });
});
