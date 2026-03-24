import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelReportService } from '../../service/excel-report.service';

@Component({
  selector: 'app-area-buttons',
  templateUrl: './area-buttons.component.html',
  styleUrls: ['./area-buttons.component.scss']
})
export class AreaButtonsComponent {

  @Input() buttons: { text: string, icon: string, link?: string, scrollTarget?: string, action?: string }[] = [];
  @Input() tipoEstructura: 'area' | 'subarea' = 'area';
  @Input() nombreEstructura: string = '';

  generandoExcel = false;

  constructor(private router: Router, private excelReportService: ExcelReportService) {}

  onButtonClick(button: { text: string, icon: string, link?: string, scrollTarget?: string, action?: string }): void {
    if (button.action === 'generarInforme') {
      this.generarInforme();
    } else {
      this.navigateTo(button);
    }
  }

  navigateTo(button: { text: string, icon: string, link?: string, scrollTarget?: string }) {

    if (button.scrollTarget) {
      const element = document.getElementById(button.scrollTarget);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    else if (button.link) {
      this.router.navigate([button.link]);
    }
  }

  private generarInforme(): void {
    if (this.generandoExcel) {
      return;
    }

    this.generandoExcel = true;

    const observable = this.tipoEstructura === 'area'
      ? this.excelReportService.generarInformeArea(this.nombreEstructura)
      : this.excelReportService.generarInformeSubarea(this.nombreEstructura);

    observable.subscribe({
      next: () => this.generandoExcel = false,
      error: (error) => {
        console.error('Error al generar el informe:', error);
        alert('Error al generar el informe. Por favor, intente nuevamente.');
        this.generandoExcel = false;
      }
    });
  }

}
