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

});
