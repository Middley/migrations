import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTitleService } from '../../shared/services/custom-title.service';


@Component({
  selector: 'cad-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(customTitle: CustomTitleService) {
    customTitle.set('Home')
   }

}
