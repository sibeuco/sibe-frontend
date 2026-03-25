import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IndicatorService } from './indicator.service';
import { environment } from 'src/environments/environment';

describe('IndicatorService', () => {
  let service: IndicatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IndicatorService]
    });
    service = TestBed.inject(IndicatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('should call GET to consult indicators', () => {
    service.consultarIndicadores().subscribe();
    const req = httpMock.expectOne(r => r.url === `${environment.endpoint}/indicadores`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call GET to consult indicators for activities', () => {
    service.consultarIndicadoresParaActividades().subscribe();
    const req = httpMock.expectOne(r => r.url === `${environment.endpoint}/indicadores/actividades`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call POST to add a new indicator', () => {
    const indicador = { nombre: 'Test' } as any;
    service.agregarNuevoIndicador(indicador).subscribe();
    const req = httpMock.expectOne(r => r.url === `${environment.endpoint}/indicadores`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call PUT to modify an indicator', () => {
    const indicador = { nombre: 'Updated' } as any;
    service.modificarIndicador('123', indicador).subscribe();
    const req = httpMock.expectOne(r => r.url === `${environment.endpoint}/indicadores/123`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should call GET to consult paginated indicators', () => {
    service.consultarIndicadoresPaginado(0, 10).subscribe();
    const req = httpMock.expectOne(r => r.url.includes('/indicadores/paginado'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('10');
    req.flush({ contenido: [], totalElementos: 0, totalPaginas: 0, paginaActual: 0 });
  });

  it('should pass busqueda param when provided', () => {
    service.consultarIndicadoresPaginado(1, 5, 'test').subscribe();
    const req = httpMock.expectOne(r => r.url.includes('/indicadores/paginado'));
    expect(req.request.params.get('busqueda')).toBe('test');
    req.flush({ contenido: [], totalElementos: 0, totalPaginas: 0, paginaActual: 0 });
  });
});
