import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptService } from '@cad-private/concept/shared/services/concept.service';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';

@Component({
  selector: 'cad-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss'],
  providers: [DatePipe],
})
export class ReportFiltersComponent {
  form!: FormGroup;

  optionPresale: number = 1;
  optionAdvancePayment: number = 2;

  optionSelected: number = this.optionPresale;


  listComprobantTypeFiltered: number[];
  listPointOfSaleFiltered: number[];
  listStatesFiltered: number[];
  listBasicConceptFiltered: number[];


  listStatesPresale: any[] = [];
  listComprobantTypesAdvancePayment: any[] = [];
  listStatesAdvancePayment: any[] = [];

  listComprobant: any[];
  listStates: any[];
  listPointOfSale: any[];
  listBasicConcept: any[];



  constructor(
    private _fb: FormBuilder,
    private _presaleService: PresaleService,
    private _router: Router,
    private _conceptService: ConceptService,
    private datePipe: DatePipe) {
    this.reactiveForm();
    this.getDataForFilters();
    this.getAllBasicConcept();
  }

  reactiveForm() {
    const formControls = {
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    };
    this.form = this._fb.group(formControls);
    this.setDate()
  }

  setDate() {

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0); // Establecer hora a las 00:00:00 AM

    this.form.controls.fromDate.setValue(currentDate);
    this.form.controls.toDate.setValue(currentDate);
  }

  clearEndDate() {
    if (this.form.controls.toDate.value < this.form.controls.fromDate.value) {
      this.form.controls['toDate'].setValue('');
    }
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.fromDate <= d;
  };

  selectedStates($event) {
    this.listStatesFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedComprobant($event) {
    this.listComprobantTypeFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedBasicConcept($event) {
    this.listBasicConceptFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedPointOfSale($event) {
    this.listPointOfSaleFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  getDataForFilters() {
    // console.log("Hola");

    this._presaleService.GetFiltersReportPresale().subscribe(response => {
      // console.log(response);
      this.setDataForFilters(response.data);
    })
  }

  setDataForFilters(data) {
    this.listStatesPresale = data.statesPresale;
    this.listStates = data.statesPresale;

    this.listComprobant = data.comprobantTypesAdvancePayment;

    this.listPointOfSale = data.pointOfSale;
    this.listStatesAdvancePayment = data.statesAdvancePayment;
    this.listComprobantTypesAdvancePayment = data.comprobantTypesAdvancePayment;
  }

  changeOption(option: number) {
    if (option == 1) {
      // this.listComprobant = [];
      this.listStates = this.listStatesPresale;
    }
    else {
      this.listComprobant = this.listComprobantTypesAdvancePayment;
      this.listStates = this.listStatesAdvancePayment;
    }

    this.listStatesFiltered = this.listStates.map(function (a) {
      return a.id;
    });

    // this.listComprobantTypeFiltered = this.listComprobant.map(function (a) {
    //   return a.id;
    // });
  }

  getAllBasicConcept() {
    this._conceptService.getAllBasicConcept().subscribe(response => {
      this.listBasicConcept = response;
    })
  }

  openReportByConcept() {
    var data = this.dataFilters()
    data.comprobantTypeID = [];
    this._router.navigate(['/private/preSale/report-by-concept'], { state: { data } });
  }

  openReportByAdvancePayment() {
    var data = this.dataFilters();
    this._router.navigate(['/private/preSale/report-by-advance-payment'], { state: { data } });
  }

  openReportByBasicConcept() {
    var data = this.dataFilters();
    data.comprobantTypeID = [];
    data['basicConceptIDs'] = this.listBasicConceptFiltered;
    this._router.navigate(['/private/preSale/report-by-basic-concept'], { state: { data } });
  }

  openReportByPaymentMethods() {
    var data = this.dataFilters();
    this._router.navigate(['/private/preSale/report-by-payment-methods'], { state: { data } });
  }

  openReportSaleByPresale() {
    var data = this.dataFilters();
    data.comprobantTypeID = [];
    this._router.navigate(['/private/preSale/report-sale-by-presale'], { state: { data } });
  }

  dataFilters() {
    let listPointOfSaleName = this.listPointOfSale.filter(item => this.listPointOfSaleFiltered.includes(item.id)).map(item => item.name);
    let listComprobantTypeName = this.listComprobantTypeFiltered ? this.listComprobant.filter(item => this.listComprobantTypeFiltered.includes(item.id)).map(item => item.name) : [];
    let listStateName = this.listStates.filter(item => this.listStatesFiltered.includes(item.id)).map(item => item.name);

    const todate = new Date(this.form.value.toDate);
    todate.setHours(23, 59, 0);

    let fromDate = this.datePipe.transform(this.form.value.fromDate, 'YYYY/MM/dd HH:mm:ss');
    let toDate = this.datePipe.transform(todate, 'YYYY/MM/dd HH:mm:ss');
    var filters = [
      { name: "Desde", value: [fromDate] },
      { name: "Hasta", value: [toDate] },
      { name: "Punto de Venta", value: listPointOfSaleName },
      { name: "Estados", value: listStateName },
      { name: "Comprobantes", value: listComprobantTypeName },
    ];

    var data = {
      pageNumber: 1,
      pageSize: 5,
      fromDate: this.datePipe.transform(this.form.value.fromDate, 'YYYY/MM/dd HH:mm:ss'),
      toDate: this.datePipe.transform(todate, 'YYYY/MM/dd HH:mm:ss'),
      comprobantTypeID: this.listComprobantTypeFiltered ? this.listComprobantTypeFiltered : [],
      pointOfSale: this.listPointOfSaleFiltered,
      statesID: this.listStatesFiltered,
      filters: filters
    };

    return data;
  }


}
