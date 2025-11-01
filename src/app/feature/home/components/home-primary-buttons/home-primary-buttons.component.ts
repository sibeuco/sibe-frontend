import { Component } from '@angular/core';

@Component({
  selector: 'app-home-primary-buttons',
  templateUrl: './home-primary-buttons.component.html',
  styleUrls: ['./home-primary-buttons.component.scss']
})
export class HomePrimaryButtonsComponent {

  scrollToFilters(): void {
    const element = document.getElementById('home-filters-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

}
