import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import * as bootstrap from 'bootstrap';

import { IndicatorsComponent } from './indicators.component';
import { IndicatorService } from '../../service/indicator.service';
import { PaginatedResponse } from 'src/app/shared/model/paginated-response.model';
import { IndicatorResponse } from '../../model/indicator.model';

describe('IndicatorsComponent', () => {
  let component: IndicatorsComponent;
  let fixture: ComponentFixture<IndicatorsComponent>;
  let mockIndicatorService: jasmine.SpyObj<IndicatorService>;

  const mockIndicadores: IndicatorResponse[] = [
    {
      identificador: 'i1', nombre: 'Indicador 1',
      tipoIndicador: { identificador: 'ti1', naturalezaIndicador: 'N1', tipologiaIndicador: 'T1' },
      temporalidad: { identificador: 'f1', nombre: 'Mensual' },
      proyecto: { identificador: 'p1', numeroProyecto: '001', nombre: 'Proyecto 1', objetivo: 'Obj 1' },
      publicosInteres: [{ identificador: 'pi1', nombre: 'Publico 1' }]
    }
  ];

  const mockPaginatedResponse: PaginatedResponse<IndicatorResponse> = {
    contenido: mockIndicadores,
    totalElementos: 1,
    totalPaginas: 1,
    paginaActual: 0
  };

  beforeEach(() => {
    mockIndicatorService = jasmine.createSpyObj('IndicatorService', ['consultarIndicadoresPaginado']);
    mockIndicatorService.consultarIndicadoresPaginado.and.returnValue(of(mockPaginatedResponse));

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [IndicatorsComponent],
      providers: [
        { provide: IndicatorService, useValue: mockIndicatorService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(IndicatorsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load indicators', () => {
      fixture.detectChanges();
      expect(mockIndicatorService.consultarIndicadoresPaginado).toHaveBeenCalled();
      expect(component.indicadores).toEqual(mockIndicadores);
    });
  });

  describe('loadIndicators', () => {
    it('should populate indicators and pagination data', () => {
      component.loadIndicators();
      expect(component.indicadores).toEqual(mockIndicadores);
      expect(component.indicadoresFiltrados).toEqual(mockIndicadores);
      expect(component.totalElementos).toBe(1);
      expect(component.totalPaginas).toBe(1);
      expect(component.paginaActual).toBe(0);
      expect(component.cargando).toBeFalse();
    });

    it('should pass searchTerm trimmed', () => {
      component.searchTerm = '  test  ';
      component.loadIndicators();
      expect(mockIndicatorService.consultarIndicadoresPaginado).toHaveBeenCalledWith(0, 10, 'test');
    });

    it('should handle empty contenido as empty array', () => {
      mockIndicatorService.consultarIndicadoresPaginado.and.returnValue(of({
        contenido: null as any, totalElementos: 0, totalPaginas: 0, paginaActual: 0
      }));
      component.loadIndicators();
      expect(component.indicadores).toEqual([]);
    });

    it('should handle error', () => {
      mockIndicatorService.consultarIndicadoresPaginado.and.returnValue(throwError(() => new Error('fail')));
      component.loadIndicators();
      expect(component.error).toBe('No se pudieron cargar los indicadores.');
      expect(component.cargando).toBeFalse();
    });
  });

  describe('filterIndicators', () => {
    it('should reset page to 0 and reload', () => {
      component.paginaActual = 3;
      component.filterIndicators();
      expect(component.paginaActual).toBe(0);
      expect(mockIndicatorService.consultarIndicadoresPaginado).toHaveBeenCalled();
    });
  });

  describe('cambiarPagina', () => {
    it('should set page and reload indicators', () => {
      component.cambiarPagina(2);
      expect(mockIndicatorService.consultarIndicadoresPaginado).toHaveBeenCalledWith(2, 10, undefined);
    });
  });

  describe('abrirModalEdicion', () => {
    it('should set indicadorSeleccionado', () => {
      component.abrirModalEdicion(mockIndicadores[0]);
      expect(component.indicadorSeleccionado).toEqual(mockIndicadores[0]);
    });
  });

  describe('onIndicadorModificado', () => {
    it('should reload indicators and clear selection', () => {
      mockIndicatorService.consultarIndicadoresPaginado.calls.reset();
      component.indicadorSeleccionado = mockIndicadores[0];
      component.onIndicadorModificado(mockIndicadores[0]);
      expect(mockIndicatorService.consultarIndicadoresPaginado).toHaveBeenCalled();
      expect(component.indicadorSeleccionado).toBeNull();
    });
  });

  describe('onIndicadorCancelado', () => {
    it('should clear selection', () => {
      component.indicadorSeleccionado = mockIndicadores[0];
      component.onIndicadorCancelado();
      expect(component.indicadorSeleccionado).toBeNull();
    });
  });

  describe('abrirModalEdicion with DOM element', () => {
    it('should show modal when element exists', () => {
      const mockModal = { show: jasmine.createSpy('show') };
      spyOn(bootstrap.Modal, 'getInstance').and.returnValue(mockModal as any);
      spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
      component.abrirModalEdicion(mockIndicadores[0]);
      expect(mockModal.show).toHaveBeenCalled();
    });
  });

  describe('cerrarModal with DOM element', () => {
    it('should hide modal when element and instance exist', () => {
      const mockModal = { hide: jasmine.createSpy('hide') };
      spyOn(bootstrap.Modal, 'getInstance').and.returnValue(mockModal as any);
      spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
      component.onIndicadorCancelado();
      expect(mockModal.hide).toHaveBeenCalled();
    });
  });
});
