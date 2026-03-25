import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import * as bootstrap from 'bootstrap';

import { IndicatorsComponent } from './indicators.component';
import { IndicatorService } from '../../service/indicator.service';
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

  beforeEach(() => {
    mockIndicatorService = jasmine.createSpyObj('IndicatorService', ['consultarIndicadores']);
    mockIndicatorService.consultarIndicadores.and.returnValue(of(mockIndicadores));

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
      expect(mockIndicatorService.consultarIndicadores).toHaveBeenCalled();
      expect(component.indicadores).toEqual(mockIndicadores);
    });
  });

  describe('loadIndicators', () => {
    it('should populate indicators on success', () => {
      component.loadIndicators();
      expect(component.indicadores).toEqual(mockIndicadores);
      expect(component.indicadoresFiltrados).toEqual(mockIndicadores);
    });

    it('should handle error gracefully', () => {
      mockIndicatorService.consultarIndicadores.and.returnValue(throwError(() => new Error('fail')));
      component.loadIndicators();
      expect(component.indicadores).toEqual([]);
    });
  });

  describe('filterIndicators', () => {
    it('should reload indicators', () => {
      component.filterIndicators();
      expect(component.indicadoresFiltrados).toBeDefined();
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
      mockIndicatorService.consultarIndicadores.calls.reset();
      component.indicadorSeleccionado = mockIndicadores[0];
      component.onIndicadorModificado(mockIndicadores[0]);
      expect(mockIndicatorService.consultarIndicadores).toHaveBeenCalled();
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
