import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { getAllComprobantSelectorDTO } from '@cad-private/presale/shared/models/getAllComprobantSelectorDTO.model';
import { CommercialActorSelectorComponent } from '../commercial-actor-selector/commercial-actor-selector.component';

@Component({
  selector: 'cad-register-data-invoicing',
  templateUrl: './register-data-invoicing.component.html',
  styleUrls: ['./register-data-invoicing.component.scss']
})
export class RegisterDataInvoicingComponent {
  //Actor Comercial
  @Input() parameters: any;
  @Input() saleParameter: any;
  @Input() showComercialActorSelector: boolean;

  @Input() lenghValidatorActorSelector: number[];
  @Input() listBusinessActorSearched: any[] = [];
  @Input() actorCommercial: any;
  @Input() placeholderSearchBusinessActorRegistered: string;
  @Input() disableClient: boolean;


  errorMessage: string = "El campo es requerido, o no tiene un formato valido.";

  @Output() searchBusinessActorRegistered = new EventEmitter<any>();
  @Output() seachActorCommercial = new EventEmitter<any>();
  @Output() selectBusinessActor = new EventEmitter<any>();

  //Comprobante
  @Input() listComprobant: getAllComprobantSelectorDTO[];
  @Input() placeHolderElectronicReceipt: string = "Comprobante";
  @Input() labelElectronicReceipt: string = "COMPROBANTE";

  @Output() selectedComprobant = new EventEmitter<any>();
  @Output() sendObservation = new EventEmitter<any>();


  @Input() observation: string;
  private temporizador: any;


  @ViewChild(CommercialActorSelectorComponent, { static: false }) commercialActorSelectorComponent: CommercialActorSelectorComponent;


  constructor() {

  }

  refreshSelectorActorCommercial() {
    this.commercialActorSelectorComponent.refreshSelector();
  }
  createBusinessActor($event) {
    if ($event) window.open(this.parameters.urlCreateBusinessActor);
  }

  selectedComprobantF($event) {
    this.selectedComprobant.emit($event);
  }

  searchBusinessActorRegisteredF($event) {
    this.searchBusinessActorRegistered.emit($event);
    // const queryParams = { IdRol: this.saleParameter.clientRol.id, searchString: $event };
    // this._preSaleService.getAllBusinessActorByRolAndSearchQuery(queryParams).subscribe(res => {
    //   this.listBusinessActorSearched = res.data;
    // })
  }

  public seachActorCommercialF($event: any) {
    this.seachActorCommercial.emit($event);
    // const queryParams = { IdRol: this.saleParameter.clientRol.id, IdentityDocument: $event };
    // this._preSaleService.getActorCommercialByIdentityDocument(queryParams).subscribe(res => {
    //   this.actorCommercial = res.data;
    // });
  }

  selectBusinessActorF($event) {
    this.selectBusinessActor.emit($event);
  }

  onInput() {
    clearTimeout(this.temporizador);

    this.temporizador = setTimeout(() => {
      this.sendObservation.emit(this.observation);
    }, 3000);
  }


  clearData() {
    this.observation = '';
  }
}
