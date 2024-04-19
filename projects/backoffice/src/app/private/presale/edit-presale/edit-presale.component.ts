import { Component, ViewChild } from '@angular/core';
import { ConceptService } from '@cad-private/concept/shared/services/concept.service';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { OperationDetail } from '../shared/models/operationDetail.model';
import { PresaleOrderData } from '../shared/models/orderData.model';
import { presaleDTO } from '../shared/models/presaleDTO.model';
import { PayData } from '@cad-private/transactions/shared/models/payDTO.model';
import { BusinessComprobantDTO } from '../shared/models/businessComprobantDTO.model';
import { ParameterSelectorConcept } from '@cad-private/concept/shared/models/parameter.model';
import { ParameterService } from '@cad-private/shared/services/parameter.service';
import { BusinessConceptSelectionMode } from 'projects/backoffice/src/assets/enums/SearchByCriterionEnum';
import { getSaleParameterDTO } from '@cad-private/shared/models/parameter/getSaleParameterDTO.model';
import { ComprobantService } from '@cad-private/shared/services/comprobant/comprobant.service';
import { getAllComprobantSelectorDTO } from '../shared/models/getAllComprobantSelectorDTO.model';
import { BusinessActorSelectorDTO } from '../shared/models/businessActorSelectorDTO.model';
import { GetActorCommercialDTO } from '../shared/models/getActorCommercialDTO.model';
import { BusinessActorService } from '../shared/services/business-actor.service';
import { ComprobantType } from '../shared/enums/comprobantType';
import { GetConceptByIdWithComplementsDTO } from '../shared/models/getConceptByIdWithComplementsDTO.model';
import { PriceConceptBusinessCommercialDTO } from '../shared/models/priceBusinessConceptCommercialDTO.model';
import { RegisterDataInvoicingComponent } from 'projects/ui-components/src/lib/register-data-invoicing/register-data-invoicing.component';
import { Router } from '@angular/router';

@Component({
  selector: 'cad-edit-presale',
  templateUrl: './edit-presale.component.html',
  styleUrls: ['./edit-presale.component.scss']
})
export class EditPresaleComponent {

  //Data Dumps Component
  conceptDetailData: any;
  presaleBD: any;
  // saleParameter: getSaleParameterDTO;
  listConcept: any[];
  parametersSelectorConcept: ParameterSelectorConcept;
  conceptDetail = new OperationDetail();
  order: PresaleOrderData = new PresaleOrderData();
  //parameters
  parameters: any;
  parametersConceptDetail: any;
  pay: PayData = new PayData();
  //Preventa
  preSale: presaleDTO = new presaleDTO(this.order, this.pay, false);

  voucherPresale: BusinessComprobantDTO = new BusinessComprobantDTO();
  listComprobant: getAllComprobantSelectorDTO[] = [];

  lenghValidatorActorSelector: number[] = [8, 11];

  actorCommercial: GetActorCommercialDTO;
  listBusinessActorSearched: BusinessActorSelectorDTO[] = [];

  placeholderSearchBusinessActorRegistered: string = "BUSCAR EN CLIENTES REGISTRADOS";

  //Enum
  // comprobantTypePresale: number = ComprobantType.PRESALE;
  @ViewChild(RegisterDataInvoicingComponent, { static: false }) RegisterDataInvoicingComponent: RegisterDataInvoicingComponent;

  constructor(private _presaleService: PresaleService,
    private _conceptService: ConceptService,
    private _router: Router,) {

    this.parametersConceptDetail = {};
    // this.getPresale();
  }

  ngOnInit() {
    if (history.state.Id) {
      this.getPresale(history.state.Id);
      this.preSale.id = history.state.Id;
    }
    this.GetSettings();
    this.initializeDataDumpsComponents();
    this.order.details = [];

    // Selector de conceptos
    this.GetParametersSelectorConcept();
  }

  getPresale(id) {
    this._presaleService.getPresaleForEditByID(id)
      .subscribe(response => {
        this.presaleBD = response.data;
        this.actorCommercial = this.presaleBD.client;
        this.preSale.order.client = this.presaleBD.client;

        response.data.details.forEach(item => {
          this.conceptDetail.businessConcept = item;
          this.addDetail();
          var detail = this.order.details.find(dt => dt.businessConcept.id == item.id);
          detail.amount = item.quantity;
          detail.igv = item.igv;
          detail.import = detail.amount * detail.unitPrice;
        });
        this.calculateTotal(this.order.details);
      });
  }

  GetSettings() {
    this._presaleService.GetSettings().subscribe(response => {
      this.parameters = response.data;
      // this.getSaleParameters();
      this.setParameterToConceptDetail();

    })
  }
  setParameterToConceptDetail() {
    this.parametersConceptDetail.allowRegistrationDetailsByConcepts = this.parameters.allowRegistrationDetailsByConcepts;
    this.parametersConceptDetail.outputGoodsSubjectToAvailabilityStock = this.parameters.outputGoodsSubjectToAvailabilityStock;
    this.parametersConceptDetail.allowEnterImport = this.parameters.allowEnterImport;
    this.parametersConceptDetail.allowEnterUnitPrice = this.parameters.allowEnterUnitPrice;
    this.parametersConceptDetail.allowEnterAmount = this.parameters.allowEnterAmount;
    this.parametersConceptDetail.decimalNumberValues = this.parameters.decimalNumbersInPrice;
  }

  GetParametersSelectorConcept() {
    this._conceptService.GetParameter().subscribe(response => {
      this.parametersSelectorConcept = response.data;

      if (this.parametersSelectorConcept.businessConceptSelectionMode == BusinessConceptSelectionMode.businessConceptSelectionModeEager) {
        this.GetAllConcept();
      }
    });
  }

  initializeDataDumpsComponents() {
    this.conceptDetailData = {};
  }

  changeAmountConceptDetail($event) {
    this.calcuteValuesDetail($event.identifier, this.order.details, $event.index);
  }

  GetAllConcept() {
    this._conceptService.GetAllConcept().subscribe(response => {
      this.listConcept = response;
    })
  }

  changeImportConceptDetail($event) {
    this.calcuteValuesDetail($event.identifier, this.order.details, $event.index);
  }

  changeUnitPriceConceptDetail($event) {
    this.calcuteValuesDetail($event.identifier, this.order.details, $event.index);
  }

  deleteConceptDetail($event) {
    this.order.details.splice($event, 1);
    this.calculatePlasticsBagsNumber(this.order.details);
    this.calculateTotal(this.order.details);
  }

  changeTariffConceptDetail($event) {
    this.order.details[$event.index].unitPrice = parseFloat(this.order.details[$event.index].tariffPrice.value.toFixed(this.parameters.decimalNumbersInPrice));
    this.calcuteValuesDetail($event.identifier, this.order.details, $event.index);
  }

  searchConceptByCode($event) {
    this._conceptService.GetConcepIdByBarcode($event).subscribe(response => {
      if (response.data) {
        this.searchConceptInSelector(response.data);
      }
    });
  }

  searchConceptInSelector($event) {
    const queryParams = { businessConceptId: $event, priceComplement: true, stockComplement: true };
    this._conceptService.getBusinessConceptByIdWithComplements(queryParams).subscribe(res => {
      this.conceptDetail.businessConcept = res.data;
      // console.log(this.conceptDetail.businessConcept);
      this.addDetail();
    })
  }

  addDetail() {
    let validate = false;
    let index = 0;
    if (this.order.details.length > 0) {
      this.order.details.forEach(d => {
        if (d.businessConcept.id == this.conceptDetail.businessConcept.id) {
          validate = true;
        }
      })
    }
    if (validate && !this.parameters.allowRegistrationDetailsByConcepts) {
      this.addAmount(this.order.details, index);
      this.conceptDetail = new OperationDetail();
    } else {
      if (this.conceptDetail.businessConcept.isAsset) {
        this.conceptDetail.amount = this.parameters.applyAmountDefault ? (this.conceptDetail.businessConcept.stock > parseInt(this.parameters.defaultQuantity)
          || !this.parameters.outputGoodsSubjectToAvailabilityStock) ? parseInt(this.parameters.defaultQuantity) : this.conceptDetail.businessConcept.stock : parseFloat("");
      } else {
        this.conceptDetail.amount = this.parameters.applyAmountDefault || this.parameters.outputGoodsSubjectToAvailabilityStock ? parseInt(this.parameters.defaultQuantity) : 1;
      }
      //bolsas plasticas  to do

      //alerta que no tiene precio to do
      var precio = this.conceptDetail.businessConcept.prices.find(p => p.tariffId === this.parameters.tariffDefaultSelectedId);
      if (precio == null) {
        //mostrar aletra 
        precio = this.conceptDetail.businessConcept.prices[0];
      }
      this.conceptDetail.unitPrice = parseFloat(precio.value.toFixed(this.parameters.decimalNumbersInPrice));
      this.conceptDetail.priceCalculateOperation = false;
      //versionFila
      this.conceptDetail.tariffPrice = precio;
      this.conceptDetail.discount = 0;
      this.conceptDetail.import = parseFloat(((this.conceptDetail.unitPrice * this.conceptDetail.amount) - this.conceptDetail.discount).toFixed(this.parameters.decimalNumbersInPrice));
      this.conceptDetail.calculationMask = this.parameters.defaultCalculationMask;
      this.conceptDetail.igv = (!this.conceptDetail.businessConcept.exemptIGV && (this.preSale.order.presaleApplyIgv || !this.parameters.applyAmazonLaw)) ? parseFloat((this.conceptDetail.import -
        (this.conceptDetail.import / (1 + this.parameters.igvRate))).toFixed(this.parameters.decimalNumbersInPrice)) : 0;
      this.order.details.unshift(this.conceptDetail);
      this.conceptDetail = new OperationDetail();
      this.calculatePlasticsBagsNumber(this.order.details);
      this.calculateTotal(this.order.details);
    }
    this.ValidateSave();
  }

  addAmount(details, index) {
    details[index].amount++;
    details[index].import = parseFloat(((details[index].amount * details[index].unitPrice) - details[index].discount).toFixed(this.parameters.decimalNumbersInPrice));
    this.verifyStockAndCalculateDetail(details, index);
    this.calculatePlasticsBagsNumber(details);
    this.calculateTotal(details);
  }

  calculatePlasticsBagsNumber(details) {
    this.order.plasticBagsNumber = 0;
    for (var i = 0; i < details.length; i++) {
      if (details[i].businessConcept.familyId == this.parameters.familyPlasticBagsId) {
        this.order.plasticBagsNumber += details[i].amount;
      }
    }
  }

  calculateTotal(details) {
    if (this.order.freight > 0) {
      this.order.total = this.order.freight;
      this.order.igv = (this.order.applyIGVWhenItIsAmazonia || !this.parameters.applyAmazonLaw) ? this.order.freight - (this.order.freight / (1 + this.parameters.IgvRate)) : 0;
      this.order.subTotal = this.order.total - this.order.igv;
    } else {
      this.order.subTotal = 0;
      this.order.igv = 0;
      this.order.total = 0;
    }
    this.order.discount = 0;
    for (var i = 0; i < details.length; i++) {
      this.order.total += parseFloat(details[i].import.toFixed(this.parameters.decimalNumbersInPrice) == '' ? 0 : details[i].import.toFixed(this.parameters.decimalNumbersInPrice));
      this.order.discount += parseFloat(details[i].discount.toFixed(this.parameters.decimalNumbersInPrice));
      this.order.igv += parseFloat(details[i].igv);
    }
    this.order.igv = parseFloat(this.order.igv.toFixed(this.parameters.decimalNumbersInPrice));
    this.order.subTotal = parseFloat((this.order.total - this.order.igv).toFixed(this.parameters.decimalNumbersInPrice));
    this.order.icbper = parseFloat((this.order.plasticBagsNumber * this.parameters.unitCostOfIcbper).toFixed(this.parameters.decimalNumbersInPrice));
    this.order.total = this.order.total + parseFloat((this.order.icbper.toFixed(this.parameters.decimalNumbersInPrice)));

    this.validateDetails(details);
    // ctrl.cambioTotal();
    // ctrl.validarRegistradorDetalles();
  };

  ValidateSave() {
    if (this.preSale.order.details.length > 0 && this.preSale.order.client && this.voucherPresale) {
      this.preSale.isvalid = true;
      // if (this.isThereAnticipo) {
      //   if (this.voucherAnticipo && this.preSale.pay.trace && this.preSale.order.clientAdvancePayment != null) {
      //     this.preSale.isvalid = this.preSale.pay.trace.length > 0 ? true : false;
      //   } else {
      //     this.preSale.isvalid = false;
      //   }
      // }
    }
    else {
      this.preSale.isvalid = false;
    }

  }

  verifyStockAndCalculateDetail(details, index) {
    if (details[index].businessConcept.isAsset && this.parameters.outputGoodsSubjectToAvailabilityStock && details[index].amount > details[index].businessConcept.stock) {
      //mostrar advertencia to do
      details[index].amount = details[index].businessConcept.stock;
    }
    this.calculatePlasticsBagsNumber(details);
    this.calcuteValuesDetail(1, details, index);
  };

  validateDetails(details) {
    let detailsWithAssets = false;
    for (var i = 0; i < details.length; i++) {
      detailsWithAssets = detailsWithAssets || details[i].businessConcept.isAsset;
    }
    this.order.existAssetsInDetails = detailsWithAssets;
  };

  calcuteValuesDetail(identifier, details, index) {
    if (identifier == 1) {
      this.changeCalculationMask(details, index, 0, '1');
      if (this.parameters.enterQuantityCalculateUnitPrice) {
        details[index].unitPrice = parseFloat((details[index].import / details[index].amount).toFixed(this.parameters.decimalNumbersInPrice));
        this.changeCalculationMask(details, index, 1, '0');
      }
      else {
        details[index].import = parseFloat((details[index].unitPrice * details[index].amount).toFixed(this.parameters.decimalNumbersInPrice));
        this.changeCalculationMask(details, index, 2, '0');
      }
    }
    if (identifier == 2)//Precio Unitario
    {
      this.changeCalculationMask(details, index, 1, '1');
      if (this.parameters.enterUnitPriceCalculateImport) {
        details[index].import = parseFloat((details[index].unitPrice * details[index].amount).toFixed(this.parameters.decimalNumbersInPrice));
        this.changeCalculationMask(details, index, 2, '0');
      }
      else {
        details[index].amount = parseFloat((details[index].import / details[index].unitPrice).toFixed(this.parameters.decimalNumbersInPrice));
        this.changeCalculationMask(details, index, 0, '0');
      }
    }
    if (identifier == 3)//Importe
    {
      this.changeCalculationMask(details, index, 2, '1');
      if (this.parameters.enterAmountCalculateAmount) {
        details[index].amount = parseFloat((details[index].import / details[index].unitPrice).toFixed(this.parameters.decimalNumbersInPrice));
        this.changeCalculationMask(details, index, 0, '0');
      }
      else {
        details[index].unitPrice = parseFloat((details[index].import / details[index].amount).toFixed(this.parameters.decimalNumbersInPrice));
        this.changeCalculationMask(details, index, 1, '0');
      }
    }
    //Verificar que la cantidad sea menor que el stock
    if (details[index].isAsset && this.parameters.OutputGoodsSubjectToAvailabilityStock && details[index].amount > details[index].Producto.Stock) {
      //SweetAlert.warning("Advertencia", "El Stock de " + detalles[index].Producto.NombreDetalle + " es " + details[index].Producto.Stock);
      details[index].amount = details[index].businessConcept.stock;
    }
    //Calcular el numero de bolsas de plastico
    this.calculatePlasticsBagsNumber(details);
    details[index].igv = (!details[index].businessConcept.exemptIGV && (this.order.presaleApplyIgv || !this.parameters.applyAmazonLaw)) ? parseFloat((details[index].import - (details[index].import / (1 + this.parameters.igvRate))).toFixed(this.parameters.decimalNumbersInPrice)) : 0;
    this.calculateTotal(details);
  };

  changeCalculationMask(details, index, field, value) {
    let calculationMaskArray = details[index].calculationMask.split('');
    calculationMaskArray[field] = value;
    details[index].calculationMask = calculationMaskArray.join('');
  };

  changeApplyIgvPresale() {
    for (var i = 0; i < this.preSale.order.details.length; i++) {
      if (this.preSale.order.presaleApplyIgv) {
        this.preSale.order.details[i].igv = parseFloat(this.preSale.order.details[i].import.toFixed(this.parameters.decimalNumbersInPrice)) - (this.preSale.order.details[i].import / (1 + this.parameters.igvRate));
        this.preSale.order.details[i].igv = parseFloat(this.preSale.order.details[i].igv.toFixed(this.parameters.decimalNumbersInPrice));
      } else {
        this.preSale.order.details[i].igv = 0;
      }
    }
    this.calculateTotal(this.preSale.order.details);
  }

  setActorComercial($event) {
    this.preSale.order.client = $event;
  }

  setComprobant($event) {
    this.preSale.order.comprobant.push($event);
  }

  save() {
    this.preSale.order = this.order;
    // this.preSale.order.comprobant = [];
    // this.preSale.order.comprobant.push(this.voucherPresale);
    for (var i = 0; i < this.preSale.order.details.length; i++) {
      var concept = new GetConceptByIdWithComplementsDTO(this.preSale.order.details[i]);
      var prices: PriceConceptBusinessCommercialDTO[] = [];
      for (var j = 0; j < this.preSale.order.details[i].businessConcept.prices.length; j++) {
        var priceDetail = new PriceConceptBusinessCommercialDTO(this.preSale.order.details[i].businessConcept.prices[j]);
        prices.push(priceDetail);
      }
      concept.prices = prices;
      this.preSale.order.details[i].businessConcept = concept;
    }
    this._presaleService.editPresale(this.preSale).subscribe(res => {
      //Imprimir
      // console.log(res);
      // this.refreshDataPresale();

      this._router.navigate(['/private/preSale/']);
    });
  }

  refreshDataPresale() {
    this.preSale.order.details = [];
    this.actorCommercial = new GetActorCommercialDTO();
    this.preSale.order.observationPresale = "NINGUNO";
    this.preSale.order.observationAnticipo = "NINGUNO";

    //selector Actors
    this.RegisterDataInvoicingComponent.refreshSelectorActorCommercial();

  }
}
