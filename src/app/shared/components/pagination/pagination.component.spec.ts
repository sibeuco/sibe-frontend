import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('deberiaEmitirEventoAlCambiarPagina', () => {
    component.totalPaginas = 5;
    component.paginaActual = 0;
    spyOn(component.cambioPagina, 'emit');

    component.irAPagina(2);

    expect(component.cambioPagina.emit).toHaveBeenCalledWith(2);
  });

  it('deberiaDeshabilitarAnteriorEnPrimeraPagina', () => {
    component.totalPaginas = 5;
    component.paginaActual = 0;
    component.totalElementos = 50;
    fixture.detectChanges();

    const anteriorBtn = fixture.nativeElement.querySelector('.page-item');
    expect(anteriorBtn.classList.contains('disabled')).toBeTrue();
  });

  it('deberiaDeshabilitarSiguienteEnUltimaPagina', () => {
    component.totalPaginas = 5;
    component.paginaActual = 4;
    component.totalElementos = 50;
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.page-item');
    const siguienteBtn = items[items.length - 1];
    expect(siguienteBtn.classList.contains('disabled')).toBeTrue();
  });

  it('deberiaMostrarIndicadorRegistros', () => {
    component.totalPaginas = 3;
    component.paginaActual = 1;
    component.totalElementos = 25;
    component.tamanioPagina = 10;
    fixture.detectChanges();

    const texto = fixture.nativeElement.querySelector('small').textContent;
    expect(texto).toContain('11');
    expect(texto).toContain('20');
    expect(texto).toContain('25');
  });

  it('no deberia emitir evento cuando la pagina es la misma', () => {
    component.totalPaginas = 5;
    component.paginaActual = 2;
    spyOn(component.cambioPagina, 'emit');

    component.irAPagina(2);

    expect(component.cambioPagina.emit).not.toHaveBeenCalled();
  });

  it('no deberia renderizar cuando no hay elementos', () => {
    component.totalElementos = 0;
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.d-flex');
    expect(container).toBeNull();
  });
});
