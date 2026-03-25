import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-buttons',
  templateUrl: './area-buttons.component.html',
  styleUrls: ['./area-buttons.component.scss']
})
export class AreaButtonsComponent {

  @Input() buttons: { text: string, icon: string, link?: string, scrollTarget?: string }[] = [];

  constructor(private router: Router) {}

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

}
