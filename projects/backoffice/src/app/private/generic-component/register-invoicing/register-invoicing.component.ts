import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BusinessActorSelectorDTO } from '@cad-private/presale/shared/models/businessActorSelectorDTO.model';
import { BusinessComprobantDTO } from '@cad-private/presale/shared/models/businessComprobantDTO.model';
import { GetActorCommercialDTO } from '@cad-private/presale/shared/models/getActorCommercialDTO.model';
import { getAllComprobantSelectorDTO } from '@cad-private/presale/shared/models/getAllComprobantSelectorDTO.model';
import { BusinessActorService } from '@cad-private/presale/shared/services/business-actor.service';
import { parametersForBussinessSelectorAndComprobantDTO } from '@cad-private/shared/models/parameter/parametersForBussinessSelectorAndComprobantDTO';
import { ComprobantService } from '@cad-private/shared/services/comprobant/comprobant.service';
import { ParameterService } from '@cad-private/shared/services/parameter.service';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';

@Component({
  selector: 'cad-register-invoicing',
  templateUrl: './register-invoicing.component.html',
  styleUrls: ['./register-invoicing.component.scss']
})
export class RegisterInvoicingComponent {

  @Input() observation;
  @Input() comprobantTypeID: number;
  @Input() parameterComprobantType: number;
  @Input() actorCommercial: GetActorCommercialDTO;
  @Input() voucher: BusinessComprobantDTO = new BusinessComprobantDTO();
  @Input() disableClient: boolean;

  @Output() sendActorComercial = new EventEmitter<any>();
  @Output() sendComprobant = new EventEmitter<any>();
  @Output() sendObservation = new EventEmitter<any>();
  private temporizador: any;

  lenghValidatorActorSelector: number[] = [8, 11];
  listBusinessActorSearched: BusinessActorSelectorDTO[] = [];
  errorMessage: string = "El campo es requerido, o no tiene un formato valido.";
  placeholderSearchBusinessActorRegistered: string = "BUSCAR EN CLIENTES REGISTRADOS";
  placeHolderElectronicReceipt: string = "Comprobante";
  labelElectronicReceipt: string = "COMPROBANTE";
  parameters: parametersForBussinessSelectorAndComprobantDTO;
  listComprobant: getAllComprobantSelectorDTO[] = [];
  listComprobantTemporal: getAllComprobantSelectorDTO[] = [];

  constructor(private _parameterService: ParameterService,
    private _businessActorService: BusinessActorService,
    private _preSaleService: PresaleService,
    private _comprobantService: ComprobantService) {
    this.getParameter();
  }


  getParameter() {
    this._parameterService.GetParameterBusinessAcotrSelector().subscribe(response => {
      this.parameters = response.data;
      this.getAllComprobantByTransaction();
    });
  }

  public seachActorCommercial($event: any) {
    const queryParams = { IdRol: this.parameters.clientRolID, IdentityDocument: $event };
    this._preSaleService.getActorCommercialByIdentityDocument(queryParams).subscribe(response => {
      this.actorCommercial = response.data;
      this.validateComprobant(this.actorCommercial.identityDocumentNumber);
      this.sendActorComercial.emit(this.actorCommercial);
    });
  }

  validateComprobant(identityNumber: string) {
    this.listComprobant = this.listComprobantTemporal;
    if (identityNumber.length > 8) {
      this.listComprobant = this.listComprobant.filter(lc => lc.typeComprobant.id == this.parameters.comprobantInvoice);
    } else {
      this.listComprobant = this.listComprobant.filter(lc => lc.typeComprobant.id != this.parameters.comprobantInvoice);
    }
  }

  createBusinessActor($event) {
    if ($event) window.open(this.parameters.urlCreateBusinessActor);
  }

  searchBusinessActorRegistered($event) {
    const queryParams = { IdRol: this.parameters.clientRolID, searchString: $event };

    this._preSaleService.getAllBusinessActorByRolAndSearchQuery(queryParams).subscribe(response => {
      this.listBusinessActorSearched = response.data;
    })
  }

  selectBusinessActor($event) {
    const queryParams = { IdRol: this.parameters.clientRolID, idBusinessActor: $event };
    this._businessActorService.getBusinessActorById(queryParams).subscribe(response => {
      this.actorCommercial = response.data;
      this.sendActorComercial.emit(this.actorCommercial);
    });
  }


  public getAllComprobantByTransaction() {
    const queryParams = { idTypeTransaction: this.parameterComprobantType };
    this._comprobantService.getAllComprobantByTransaction(queryParams).subscribe(res => {
      this.listComprobant = res.data;
      this.listComprobantTemporal = res.data;
      if (this.comprobantTypeID != 0) {
        this.listComprobant = this.listComprobant.filter(lc => lc.typeComprobant.id == this.comprobantTypeID);
      }
    })
  }

  selectedComprobant($event) {
    this.voucher.type = this.listComprobant.find(item => item.typeComprobant.id == $event).typeComprobant;
    this.voucher.serie = this.listComprobant.find(item => item.typeComprobant.id == $event).voucherSeries[0];
    this.sendComprobant.emit(this.voucher);
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
