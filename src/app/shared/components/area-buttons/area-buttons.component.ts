import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-buttons',
  templateUrl: './area-buttons.component.html',
  styleUrls: ['./area-buttons.component.scss']
})
export class AreaButtonsComponent {

  @Input() buttons: { text: string, icon: string, link: string }[] = [];

  constructor(private router: Router) {}

  navigateTo(link: string) {
    if (link) {
      this.router.navigate([link]);
    }
  }

}
