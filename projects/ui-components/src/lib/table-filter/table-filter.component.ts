import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
@Component({
  selector: 'cad-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<number>();
  @Output() searchEventDates = new EventEmitter<any>();
  @Output() searchShowFuelSupplyEvent = new EventEmitter<any>();

  @Output() editEvent = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() deleteItemCompleteEvent = new EventEmitter<any>();
  @Output() advancePaymentEvent = new EventEmitter<any>();

  @ViewChild('dt') dt: Table | undefined;
  @Input() items: any[];
  selectedItem: any;
  @Input() actions: any[];
  @Input() columns: any[];
  optionsLabel: string = 'OPCIONES';
  numberLabel: string = 'Nº';
  @Input() notFoundDataLabel = 'No se encontraron registros disponibles';
  showActions: boolean;
  scrollable: any;

  private ACTIVE: string = 'ACTIVO';
  private UNSUSCRIBE: string = 'DE BAJA';

  constructor() { }

  ngOnInit(): void {
    if (this.columns.length > 9) {
      this.scrollable = true;
    }
    if (this.columns.length < 9 && screen.width <= 1400) {
      this.scrollable = false;
    }
    if (screen.width < 1024) {
      this.scrollable = true;
    }
    this.validateActionButtons();
  }
  ngOnChanges() {
    if (this.items != null) {
      this.items.forEach(x => {
        if (x.registrationState) {
          x.registrationState = this.ACTIVE;
        } else x.registrationState = this.UNSUSCRIBE;
      });
    }
  }

  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  searchAction(id: number) {
    this.searchEvent.emit(id);
  }

  searchActionDates(id: number, fromDate: Date, toDate: Date) {
    let object = {
      id: id,
      fromDate: fromDate,
      toDate: toDate,
    };
    this.searchEventDates.emit(object);
  }
  seachActionShowFuelSupply(vehicleId: number, dispachDate: Date) {
    let object = {
      vehicleId: vehicleId,
      dispachDate: dispachDate,
    };
    this.searchShowFuelSupplyEvent.emit(object);
  }
  editAction(id: number) {
    this.editEvent.emit(id);
  }
  deleteAction(id: number) {
    this.deleteEvent.emit(id);
  }
  deleteActionItemComplete(id: number) {
    var selectedItem = this.items.find(x => x.id == id);
    this.deleteItemCompleteEvent.emit(selectedItem);
  }
  validateActionButtons() {
    if (this.actions[0] == 0 && this.actions[1] == 0 && this.actions[2] == 0) {
      this.showActions = false;
    } else this.showActions = true;
  }

  advancePayment(id: number) {
    // var selectedItem = this.items.find(x => x.id == id);
    this.advancePaymentEvent.emit(id);
  }


  // exportExcel(): void {
  //   const datos = [
  //     ...[this.columns.map(columna => columna.header)],
  //     ...this.items
  //     .map(({ id, area,type, licensePlate , brand,model,year,pipPolicy,registrationState,state }) => [id, area,type, licensePlate, brand,model,year,pipPolicy,registrationState,state])
  //   ];
  //   const libro = xlsx.utils.book_new();
  //   const hoja = xlsx.utils.aoa_to_sheet(datos);
  //   xlsx.utils.book_append_sheet(libro, hoja, 'Datos');
  //   xlsx.writeFile(libro, 'datos.xlsx');
  // }

}
