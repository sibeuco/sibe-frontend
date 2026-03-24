import { Component } from '@angular/core';
import { ExcelReportService } from 'src/app/shared/service/excel-report.service';

@Component({
  selector: 'app-home-primary-buttons',
  templateUrl: './home-primary-buttons.component.html',
  styleUrls: ['./home-primary-buttons.component.scss']
})
export class HomePrimaryButtonsComponent {

  private readonly NOMBRE_DIRECCION = 'Dirección de Bienestar y Evangelización';
  generandoExcel: boolean = false;

  constructor(private excelReportService: ExcelReportService) {}

  scrollToFilters(): void {
    const element = document.getElementById('home-filters-section');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  generarExcel(): void {
    if (this.generandoExcel) {
      return;
    }

    this.generandoExcel = true;

    this.excelReportService.generarInformeDireccion(this.NOMBRE_DIRECCION).subscribe({
      next: () => this.generandoExcel = false,
      error: (error) => {
        console.error('Error al generar el informe:', error);
        alert('Error al generar el informe. Por favor, intente nuevamente.');
        this.generandoExcel = false;
      }
    });
  }

}
