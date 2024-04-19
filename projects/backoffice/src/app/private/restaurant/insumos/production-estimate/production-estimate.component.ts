import { Component, OnInit } from '@angular/core';
import { ItemsCategory } from '../shared/interfaces/itemsCategory';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestauratService } from '../shared/services/restaurant-service.service';
import { InsumoService } from '../shared/services/insumo-service.service';
import { GetItemsByPrincipalConceptId } from '../shared/interfaces/GetItemsByPrincipalConceptId';
import { WareHouseService } from '@cad-private/warehouse/shared/services/warehouse.service';
import { GetWareHousesByRoleInsumoId } from '@cad-private/warehouse/shared/interfaces/GetWareHousesByRoleInsumoId';
import { MessagingService } from '@cad-core/services';


@Component({
  selector: 'cad-production-estimate',
  templateUrl: './production-estimate.component.html',
  styleUrls: ['./production-estimate.component.scss']
})
export class ProductionEstimateComponent implements OnInit {


  idWarehouse: number;
  idInsumo: number;
  itemsByInsumo: GetItemsByPrincipalConceptId;
  establishments: string[];
  parameters: any;
  inputNameSearch: string;
  inputCodeSearch: string;

  itemsCategory: any[] = [];
  itemsTemporal: any[] = [];
  conceptosNegocioItem: any[] = [];
  wareHouses: GetWareHousesByRoleInsumoId[];
  listItemsForSearch: any;


  form: FormGroup;
  mostrarLoading: Boolean;

  constructor(
    private fb: FormBuilder,
    private _serviceRestaurant: RestauratService,
    private _insumoService: InsumoService,
    private _warehouseService: WareHouseService,
    private messageService: MessagingService,
  ) {
    this.GetAllItemsCategory();
    this.GetWareHousesByInsumoRoleId();
    this.GetParameters();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id_concepto_principal: [''],
      id_concepto_secundario: [''],
      cantidad: [''],
      codigo: [''],
      insumoItem: [''],
      itemCategory: [''],
    });
    // this.GetAllItemsCategory();
    // this.GetAllInsumoItems();

  }

  GetParameters() {
    this._insumoService.GetParameters().subscribe(response => {
      this.parameters = response;
    });
  }

  GetAllItemsCategory() {
    this.mostrarLoading = true;
    this._serviceRestaurant.GetCategoryByItemsCategoryOfRol().subscribe(res => {
      this.itemsCategory = res;

      if (this.itemsCategory != null) {

        this.mostrarLoading = false;

        this.itemsCategory = this.itemsCategory.map((item) => {
          item.conceptoNegocio = item.conceptoNegocio.map(concept => {
            concept.itemsecundario = false;
            this.conceptosNegocioItem.push(concept);
            return concept;
          });
          return item;
        });
      }
    });
  }

  GetItemsByInsumoId(itemId: number) {
    this.idInsumo = itemId;
    this.itemsByInsumo = null;
    if (this.idWarehouse && this.idInsumo) {
      this._insumoService.GetItemsByInsumoId(this.idWarehouse, this.idInsumo).subscribe(response => {
        this.itemsByInsumo = response.data;
      }, error => {

        this.messageService.error('TITULO', 'ASD');
      });
    }
  }

  GetWareHousesByInsumoRoleId() {
    this._warehouseService.GetWareHousesByRoleInsumoId().subscribe(response => {
      this.wareHouses = response;
      this.idWarehouse = this.wareHouses[0].id;
      this.establishments = Array.from(new Set(this.wareHouses.map(({ establishmentName }) => establishmentName)));
    })
  }

  searchConceptByName() {
    if (this.inputNameSearch.length >= this.parameters.minimumNumberOfCharactersForSearch) {
      this.listItemsForSearch = this.conceptosNegocioItem.filter(x => {
        return x.nombre.toLocaleLowerCase().includes(this.inputNameSearch.toLocaleLowerCase());
      })
    } else {
      this.listItemsForSearch = [];
    }
  }

  searchConceptByCode() {
    this.conceptosNegocioItem.filter(x => {
      if (x.codigo.toLocaleLowerCase() == this.inputCodeSearch.toLocaleLowerCase()) {
        this.idInsumo = x.id;
      }
    })
    this.inputCodeSearch = "";

  }

  selectedConceptByName(event) {
    if (event) {
      this.GetItemsByInsumoId(event.option.value.id);
      this.listItemsForSearch = [];
    }
  }

  displayFn(value: any): any {
    if (value) {
      return value.concept;
    }
  }
}
