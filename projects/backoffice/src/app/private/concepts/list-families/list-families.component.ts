import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { genericItemDTO } from '@cad-private/shared/models/Generic/genericItemDTO.model';
import { StockConceptsByFamiliesService } from '../shared/services/concepts.service';
import { Router } from '@angular/router';



@Component({
  selector: 'cad-list-families',
  templateUrl: './list-families.component.html',
  styleUrls: ['./list-families.component.scss'],
  providers: [DatePipe],
})
export class ListFamiliesComponent implements OnInit {
  columns: any[];
  actions: any[];
  listStatesFiltered: number[];
  client: genericItemDTO = new genericItemDTO();


  listStates: any[];
  data: any[] = [];

  constructor(

    private _translate: TranslateService,
    private _StockFamiliesService: StockConceptsByFamiliesService,
    private _router: Router,
  ) {

    this.labelTable();
  }

  ngOnInit(): void {
    this.getListFamilies();
  }

  openRegister() {
    this._router.navigate(['/private/concepts/register-family']);
  }

  getListFamilies() {
    this._StockFamiliesService.GetAllFamiliesOfConcepts().subscribe(
      (families: any[]) => {
        this.data = families;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
  private handleError(error: any): void {
    console.error('Error fetching families:', error);
  }

  labelTable() {
    this.columns = [
      { field: 'nombre', header: this.getTranslation('COMPONENTS.LIST-FAMILIES.TABLE.COLUMN-NAME') },
      { field: 'categoria', header: this.getTranslation('COMPONENTS.LIST-FAMILIES.TABLE.COLUMN-CATEGORY') },
      { field: 'estado', header: this.getTranslation('COMPONENTS.LIST-FAMILIES.TABLE.COLUMN-STATE') },
    ];
    this.actions = [1, 0, 0];
  }
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  selectedStates($event) {
    this.listStatesFiltered = $event.map(function (a) {
      return a.id;
    });
  }

}
