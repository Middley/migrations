
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConsumptionService } from '../shared/services/consumption-insumo.service';
import { GetWareHousesByRoleInsumoId } from '@cad-private/warehouse/shared/interfaces/GetWareHousesByRoleInsumoId';

@Component({
  selector: 'cad-inventory-insumo',
  templateUrl: './inventory-insumo.component.html',
  styleUrls: ['./inventory-insumo.component.scss'],
  providers: [DatePipe],
})

export class InventoryInsumoComponent implements OnInit {

  idWarehouse: number;
  establishments: string[];
  wareHouses: GetWareHousesByRoleInsumoId[];
  form!: FormGroup;
  settings: any;
  /////////////////////////////// PRUEBAAAAAAAA////////////////////////////////
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];
  ///////////////////////////////////////////////////////////////////////////////////

  providersFiltered: any[];

  constructor(
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private _consumptionService: ConsumptionService,) {
    this.GetItems();
  }

  ngOnInit(): void {
  }

  GetItems() {
    this._consumptionService.GetSettings().subscribe(resp => {
      this.settings = resp.data;
      this.InitializeDate();
      if (this.settings.warehouses) {
        this.wareHouses = this.settings.warehouses;
        this.establishments = Array.from(new Set(this.wareHouses.map(({ establishmentName }) => establishmentName)));
      }
    })
  }

  clearEndDate() {
    this.form.controls['EndDate'].setValue('');
  }

  InitializeDate() {
    const formControls = {
      fromDate: new FormControl('', []),
      toDate: new FormControl('', []),
    };
    this.form = this._fb.group(formControls);
    this.form.controls.fromDate.setValue(new Date(this.settings.fromDate));
    this.form.controls.toDate.setValue(new Date(this.settings.toDate));
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.fromDate < d;
  };

  selectedItem($event) {
    this.providersFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  searchData() {

  }
}

interface Animal {
  name: string;
  sound: string;
}
