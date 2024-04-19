
import { Component, OnInit, ViewChild } from '@angular/core';
import { getSaleParameterDTO } from '@cad-private/shared/models/parameter/getSaleParameterDTO.model';
import { ParameterService } from '@cad-private/shared/services/parameter.service';
import { GetActorCommercialDTO } from '../shared/models/getActorCommercialDTO.model';
import { BusinessActorSelectorDTO } from '../shared/models/businessActorSelectorDTO.model';
import { BusinessActorService } from '../shared/services/business-actor.service';
import { ComprobantService } from '../../shared/services/comprobant/comprobant.service';
import { getAllComprobantSelectorDTO } from '../shared/models/getAllComprobantSelectorDTO.model';
import { ConceptService } from '@cad-private/concept/shared/services/concept.service';
import { PayData } from '../../transactions/shared/models/payDTO.model';
import { ConceptBusinessCommercialDTO, GetConceptByIdWithComplementsDTO } from '../shared/models/getConceptByIdWithComplementsDTO.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationDetail } from '../shared/models/operationDetail.model';
import { PresaleOrderData } from '../shared/models/orderData.model';
import { presaleDTO } from '../shared/models/presaleDTO.model';
import { BusinessConceptSelectionMode } from 'projects/backoffice/src/assets/enums/SearchByCriterionEnum';
import { ParameterSelectorConcept } from '@cad-private/concept/shared/models/parameter.model';
import { BusinessComprobantDTO } from '../shared/models/businessComprobantDTO.model';
import { ComprobantType } from '../shared/enums/comprobantType';
import { PaymentTraceDTO } from '@cad-private/transactions/shared/models/payDetailDTO.model';
import { PriceConceptBusinessCommercialDTO } from '../shared/models/priceBusinessConceptCommercialDTO.model';
import { MultipayRegisterComponent } from 'projects/ui-components/src/lib/multipay-register/multipay-register.component';
import { RegisterDataInvoicingComponent } from 'projects/ui-components/src/lib/register-data-invoicing/register-data-invoicing.component';
import { PresaleService } from '@cad-private/shared/services/presale/presale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cad-register-presale',
  templateUrl: './register-presale.component.html',
  styleUrls: ['./register-presale.component.scss']
})
export class RegisterPresaleComponent implements OnInit {

  //Enum
  comprobantTypePresale: number = ComprobantType.PRESALE;
  comprobantTypeAnticipo: number = ComprobantType.ANTICIPO;

  listComprobantTemporal: getAllComprobantSelectorDTO[] = [];

  //Data Dumps Component
  conceptDetailData: any;
  //parameters
  parameters: any;
  parametersConceptDetail: any;
  //validator
  lenghValidatorActorSelector: number[] = [8, 11];
  saleParameter: getSaleParameterDTO;
  placeholderSearchBusinessActorRegistered: string = "BUSCAR EN CLIENTES REGISTRADOS";
  //Actor
  actorCommercial: GetActorCommercialDTO;
  actorCommercialAnticipo: GetActorCommercialDTO;
  listBusinessActorSearched: BusinessActorSelectorDTO[] = [];
  listBusinessActorSearchedAnticipo: BusinessActorSelectorDTO[] = [];

  //RegisterConcept
  conceptDetails: OperationDetail[];
  conceptDetail = new OperationDetail();
  order: PresaleOrderData = new PresaleOrderData();
  //Comprobant
  listComprobant: getAllComprobantSelectorDTO[] = [];
  listComprobantAnticipo: getAllComprobantSelectorDTO[] = [];

  voucherPresale: BusinessComprobantDTO = new BusinessComprobantDTO();
  voucherAnticipo: BusinessComprobantDTO = new BusinessComprobantDTO();


  // labelElectronicReceipt: string = "COMPROBANTE";
  // placeHolderElectronicReceipt: string = "Comprobante";

  //MultiPay
  parameterForPaymentMode: any;
  paymentMethods: any;
  parameterPaymentMethods: any;
  bankAccounts: any;
  financialEntities: any;
  cards: any;
  isThereAnticipo: Boolean = false;
  pay: PayData = new PayData();

  //Preventa
  preSale: presaleDTO = new presaleDTO(this.order, this.pay, false);

  // Selector de Conceptos
  listConcept: any[];
  parametersSelectorConcept: ParameterSelectorConcept;

  //Multipay
  @ViewChild(MultipayRegisterComponent, { static: false }) multipayRegisterComponent: MultipayRegisterComponent;
  @ViewChild(RegisterDataInvoicingComponent, { static: false }) RegisterDataInvoicingComponent: RegisterDataInvoicingComponent;


  constructor(private _preSaleService: PresaleService,
    private _businessActorService: BusinessActorService,
    private parameterService: ParameterService,
    private comprobantService: ComprobantService,
    private _conceptService: ConceptService,
    private _fb: FormBuilder, private _router: Router
  ) {
    this.GetDataForMultipay();
    this.parametersConceptDetail = {};
  }
  ngOnInit() {
    this.GetSettings();
    this.initializeDataDumpsComponents();
    this.order.details = [];

    // Selector de conceptos
    this.GetParametersSelectorConcept();
  }


  initializeDataDumpsComponents() {
    this.conceptDetailData = {};
  }

  getSaleParameters() {
    this.parameterService.getSaleParameterDTO().subscribe(res => {
      this.saleParameter = res.data;
      this.setParameterToConceptDetail();
      this.getAllComprobantByTransaction();
    }, error => {
      console.log(error);
    })
  }

  setParameterToConceptDetail() {
    this.parametersConceptDetail.allowRegistrationDetailsByConcepts = this.parameters.allowRegistrationDetailsByConcepts;
    this.parametersConceptDetail.outputGoodsSubjectToAvailabilityStock = this.parameters.outputGoodsSubjectToAvailabilityStock;
    this.parametersConceptDetail.allowEnterImport = this.parameters.allowEnterImport;
    this.parametersConceptDetail.allowEnterUnitPrice = this.parameters.allowEnterUnitPrice;
    this.parametersConceptDetail.allowEnterAmount = this.parameters.allowEnterAmount;
    this.parametersConceptDetail.decimalNumberValues = this.parameters.decimalNumbersInPrice;
    this.parametersConceptDetail.isPresale = this.parameters.isPresale;
    this.parametersConceptDetail.showStock = false;

  }

  public getAllComprobantByTransaction() {
    const queryParams = { idTypeTransaction: this.parameters.typeComprobantPresale };
    this.comprobantService.getAllComprobantByTransaction(queryParams).subscribe(res => {
      this.listComprobant = res.data;
    })
  }

  public getAllComprobantAnticipoByTransaction() {
    const queryParams = { idTypeTransaction: this.parameters.typeComprobantAnticipo };
    this.comprobantService.getAllComprobantByTransaction(queryParams).subscribe(res => {
      this.listComprobantAnticipo = res.data;
      this.listComprobantTemporal = res.data;
      this.selectedComprobantForAnticipo(this.listComprobantAnticipo[0].typeComprobant.id);
    })
  }

  public seachActorCommercial($event: any, comrpobantType: number) {
    const queryParams = { IdRol: this.saleParameter.clientRol.id, IdentityDocument: $event };
    this._preSaleService.getActorCommercialByIdentityDocument(queryParams).subscribe(res => {
      this.setClientAdvancePayment(res.data, comrpobantType);
      this.ValidateSave();
    });
  }

  setClientAdvancePayment(data: any, comprobantType) {
    switch (comprobantType) {
      case this.comprobantTypePresale:
        this.actorCommercial = data;
        this.preSale.order.client = this.actorCommercial;
        break;
      case this.comprobantTypeAnticipo:
        this.actorCommercialAnticipo = data;
        this.preSale.order.clientAdvancePayment = this.actorCommercialAnticipo;
        this.validateComprobant(this.actorCommercialAnticipo.identityDocumentNumber);
        break;
      default:
        console.log("Opción no reconocida");
    }
  }



  GetSettings() {
    this._preSaleService.GetSettings().subscribe(response => {
      this.parameters = response.data;
      this.getSaleParameters();
    })
  }



  createBusinessActor($event) {
    if ($event) window.open(this.parameters.urlCreateBusinessActor);
  }
  searchBusinessActorRegistered($event, comrpobantType: number) {
    const queryParams = { IdRol: this.saleParameter.clientRol.id, searchString: $event };
    this._preSaleService.getAllBusinessActorByRolAndSearchQuery(queryParams).subscribe(res => {
      // this.listBusinessActorSearched = res.data;
      this.setActorRegistered(res.data, comrpobantType);
    })
  }

  setActorRegistered(data: any, comprobantType: number) {
    switch (comprobantType) {
      case this.comprobantTypePresale:
        this.listBusinessActorSearched = data;
        break;
      case this.comprobantTypeAnticipo:
        this.listBusinessActorSearchedAnticipo = data;
        this.validateComprobant(data.identityDocumentNumber);
        break;
      default:
        console.log("Opción no reconocida");
    }
  }

  selectBusinessActor($event, comprobantType: number) {
    const queryParams = { IdRol: this.saleParameter.clientRol.id, idBusinessActor: $event };
    this._businessActorService.getBusinessActorById(queryParams).subscribe(res => {
      this.setBusinessActor(res.data, comprobantType);
      // this.actorCommercial = res.data;
      // this.preSale.order.client = this.actorCommercial;
      this.ValidateSave();
    });
  }

  setBusinessActor(data, comprobantType: number) {
    switch (comprobantType) {
      case this.comprobantTypePresale:
        this.actorCommercial = data;
        this.preSale.order.client = this.actorCommercial;
        break;
      case this.comprobantTypeAnticipo:
        this.actorCommercialAnticipo = data;
        this.preSale.order.clientAdvancePayment = this.actorCommercial;
        this.validateComprobant(this.actorCommercial.identityDocumentNumber);
        break;
      default:
        console.log("Opción no reconocida");
    }
  }

  validateComprobant(identityNumber: string) {
    this.listComprobantAnticipo = this.listComprobantTemporal;
    if (identityNumber.length > 8) {
      this.listComprobantAnticipo = this.listComprobantAnticipo.filter(lc => lc.typeComprobant.id == this.parameters.comprobantInvoice);
    } else {
      this.listComprobantAnticipo = this.listComprobantAnticipo.filter(lc => lc.typeComprobant.id != this.parameters.comprobantInvoice);
    }
  }

  selectedComprobantForPresale($event) {
    this.voucherPresale.type = this.listComprobant.find(item => item.typeComprobant.id == $event).typeComprobant;
    this.voucherPresale.serie = this.listComprobant.find(item => item.typeComprobant.id == $event).voucherSeries[0];
  }

  selectedComprobantForAnticipo($event) {
    this.voucherAnticipo.type = this.listComprobantAnticipo.find(item => item.typeComprobant.id == $event).typeComprobant;
    this.voucherAnticipo.serie = this.listComprobantAnticipo.find(item => item.typeComprobant.id == $event).voucherSeries[0];
    this.ValidateSave();
  }

  searchConceptInSelector($event) {
    const queryParams = { businessConceptId: $event, priceComplement: true, stockComplement: true };
    this._conceptService.getBusinessConceptByIdWithComplements(queryParams).subscribe(res => {
      this.conceptDetail.businessConcept = res.data;
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
    this.refreshValuesPaymentTraceEditor();

  }

  addAmount(details, index) {
    details[index].amount++;
    details[index].import = parseFloat(((details[index].amount * details[index].unitPrice) - details[index].discount).toFixed(this.parameters.decimalNumbersInPrice));
    this.verifyStockAndCalculateDetail(details, index);
    this.calculatePlasticsBagsNumber(details);
    this.calculateTotal(details);
  }


  verifyStockAndCalculateDetail(details, index) {
    if (details[index].businessConcept.isAsset && this.parameters.outputGoodsSubjectToAvailabilityStock && details[index].amount > details[index].businessConcept.stock) {
      //mostrar advertencia to do
      details[index].amount = details[index].businessConcept.stock;
    }
    this.calculatePlasticsBagsNumber(details);
    this.calcuteValuesDetail(1, details, index);
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
  changeUnitPriceConceptDetail($event) {
    this.calcuteValuesDetail($event.identifier, this.order.details, $event.index);
    this.refreshValuesPaymentTraceEditor();
  }

  refreshValuesPaymentTraceEditor() {
    if (this.isThereAnticipo) {
      this.multipayRegisterComponent.paymentTraceComponent.form.controls.received.setValue(this.order.total);
      this.multipayRegisterComponent.paymentTraceComponent.form.controls.amountDelivered.setValue(this.order.total);
    }
  }

  changeAmountConceptDetail($event) {
    this.calcuteValuesDetail($event.identifier, this.order.details, $event.index);
    this.refreshValuesPaymentTraceEditor();
  }
  changeImportConceptDetail($event) {
    this.calcuteValuesDetail($event.identifier, this.order.details, $event.index);
    this.refreshValuesPaymentTraceEditor();

  }

  changeTariffConceptDetail($event) {
    this.order.details[$event.index].unitPrice = parseFloat(this.order.details[$event.index].tariffPrice.value.toFixed(this.parameters.decimalNumbersInPrice));
    this.calcuteValuesDetail($event.identifier, this.order.details, $event.index);
    this.refreshValuesPaymentTraceEditor();

  }

  deleteConceptDetail($event) {
    this.order.details.splice($event, 1);
    this.calculatePlasticsBagsNumber(this.order.details);
    this.calculateTotal(this.order.details);
    this.refreshValuesPaymentTraceEditor();

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

  validateDetails(details) {
    let detailsWithAssets = false;
    for (var i = 0; i < details.length; i++) {
      detailsWithAssets = detailsWithAssets || details[i].businessConcept.isAsset;
    }
    this.order.existAssetsInDetails = detailsWithAssets;
  };

  ValidateSave() {
    if (this.preSale.order.details.length > 0 && this.preSale.order.client && this.voucherPresale) {
      this.preSale.isvalid = true;
      if (this.isThereAnticipo) {
        if (this.voucherAnticipo && this.preSale.pay.trace && this.preSale.order.clientAdvancePayment != null) {
          this.preSale.isvalid = this.preSale.pay.trace.length > 0 ? true : false;
        } else {
          this.preSale.isvalid = false;
        }
      }
    }
    else {
      this.preSale.isvalid = false;
    }

  }

  calculatePlasticsBagsNumber(details) {
    this.order.plasticBagsNumber = 0;
    for (var i = 0; i < details.length; i++) {
      if (details[i].businessConcept.familyId == this.parameters.familyPlasticBagsId) {
        this.order.plasticBagsNumber += details[i].amount;
      }
    }
  }


  GetDataForMultipay() {
    this._preSaleService.getParameterForPaymentMode().subscribe(response => {
      this.parameterForPaymentMode = response.data;
    })

    this._preSaleService.getPaymentMethod().subscribe(response => {
      this.paymentMethods = response;
    })

    this._preSaleService.getParameterForPaymentMethod().subscribe(response => {
      this.parameterPaymentMethods = response.data;
    })
    this._preSaleService.GetBankAccountsWithFinancialEntityWithCurrency().subscribe(response => {
      this.bankAccounts = response;
    })

    this._preSaleService.getFinancialEntities().subscribe(response => {
      this.financialEntities = response;
      this.financialEntities.splice(0, 1);
    })

    this._preSaleService.getOperatorsCard().subscribe(response => {
      this.cards = response;
    })


  }

  setPayData(event: any) {
    var trace: PaymentTraceDTO[] = [];
    for (var i = 0; i < event.traza.length; i++) {
      var traceDetail = new PaymentTraceDTO();
      traceDetail.payInformation.importToPay = event.traza[i].info.importAPay;
      traceDetail.payInformation.importDelivered = event.traza[i].info.amountDelivered;
      traceDetail.payInformation.bankAccount.id = (event.traza[i].info.bankAccountId == '' || event.traza[i].info.bankAccountId == null) ? 0 : event.traza[i].info.bankAccountId;
      traceDetail.payInformation.bankAccount.value = (event.traza[i].info.bankAccountValue == '' || event.traza[i].info.bankAccountValue == null) ? 0 : event.traza[i].info.bankAccountValue;
      traceDetail.payInformation.financialEntity.id = (event.traza[i].info.financialEntityId == '' || event.traza[i].info.financialEntityId == null) ? 0 : event.traza[i].info.financialEntityId;
      traceDetail.payInformation.operatorCard.id = (event.traza[i].info.carOperatorId == '' || event.traza[i].info.carOperatorId == null) ? 0 : event.traza[i].info.carOperatorId;
      traceDetail.paymentMethod.id = event.traza[i].paymentMethodId;
      traceDetail.paymentMethod.name = event.traza[i].paymentMethodName;

      trace.push(traceDetail);
    };
    this.preSale.pay.payMode = event.paymentMode;
    this.preSale.pay.total = event.total;
    this.preSale.pay.trace = trace;
    this.ValidateSave();
  }

  save() {
    this.preSale.order = this.order;
    this.preSale.order.comprobant = [];
    this.preSale.order.comprobant.push(this.voucherPresale);
    if (!this.parameters.applyAmazonLaw) this.preSale.order.presaleApplyIgv = true;
    if (this.isThereAnticipo) this.preSale.order.comprobant.push(this.voucherAnticipo);
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
    this._preSaleService.createPresale(this.preSale).subscribe(res => {
      //Imprimir
      this.refreshDataPresale();
    });

  }

  refreshDataPresale() {
    this.preSale.order.details = [];
    this.actorCommercial = new GetActorCommercialDTO();
    this.actorCommercialAnticipo = new GetActorCommercialDTO();
    this.preSale.order.observationPresale = "NINGUNO";
    this.preSale.order.observationAnticipo = "NINGUNO";
    if (this.isThereAnticipo) {
      this.multipayRegisterComponent.refreshMultipay();
    }

    this.isThereAnticipo = false;
    //selector Actors
    this.RegisterDataInvoicingComponent.refreshSelectorActorCommercial();

  }


  clearDataPresale() {
    if (this.preSale.order.details.length > 0) {
      this.preSale = new presaleDTO(this.order, this.pay, false);
      this.preSale.order.comprobant = [];
      this.actorCommercial = null;
    }
  }

  activeAnticipo() {
    this.isThereAnticipo = true;
    this.getAllComprobantAnticipoByTransaction();
    this.ValidateSave();
  }

  writeObservationPresale($event) {
    this.preSale.order.observationPresale = $event;
  }

  writeObservationAnticipo($event) {
    this.preSale.order.observationAnticipo = $event;
  }


  // concept
  GetAllConcept() {
    this._conceptService.GetAllConcept().subscribe(response => {
      this.listConcept = response;
    })
  }

  GetParametersSelectorConcept() {
    this._conceptService.GetParameter().subscribe(response => {
      this.parametersSelectorConcept = response.data;
      this.parametersSelectorConcept.businessConceptSelectionMode = BusinessConceptSelectionMode.businessConceptSelectionModeEager;
      if (this.parametersSelectorConcept.businessConceptSelectionMode == BusinessConceptSelectionMode.businessConceptSelectionModeEager) {
        this.GetAllConcept();
      }
    });
  }

  searchConceptByCode($event) {
    this._conceptService.GetConcepIdByBarcode($event).subscribe(response => {
      if (response.data) {
        this.searchConceptInSelector(response.data);
      }
    });
  }


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

  refreshSelector($event) {
    this.GetAllConcept();
  }

  desactiveAnticipo() {
    this.isThereAnticipo = false;
    this.ValidateSave();
  }

  back() {
    this._router.navigate(['/private/preSale']);
  }
}
