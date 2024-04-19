import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'cad-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit{
  @Input() Title!:string;
  constructor(){}
  ngOnInit(): void {
  }
}
