import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { buffer, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { responseGenericApi } from '@cad-private/shared/models/response/response.model';
import { presaleDTO } from '../../../presale/shared/models/presaleDTO.model';
import { saleByPresaleDTO } from '@cad-private/presale/shared/models/SaleByPresaleDTO.model';
@Injectable({
  providedIn: 'root'
})
export class PresaleService {
  _presaleURL: string;
  _businessActorURL: string;
  _parameterURL: string;
  _masterURL: string;
  _financeURL: string;
  _saleURL: string;

  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._presaleURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/PreSale`;
    this._businessActorURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/BusinessActor`;
    this._parameterURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Parameter`;
    this._masterURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Master`;
    this._financeURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Finance`;
    this._saleURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Sale`;
  }

  GetSettings(): Observable<any> {
    return this.httpService.get<any>(this._presaleURL + '/GetSettings');
  }
  //Actor
  getActorCommercialByIdentityDocument(queryParams): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._businessActorURL + "/GetBusinessActorByIdentityDocument", { params: queryParams as any });
  }

  getAllBusinessActorByRolAndSearchQuery(queryParams): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._businessActorURL + "/GetBusinessActorsActiveByRolAndSearchString", { params: queryParams as any })
  }

  //Presale
  createPresale(presaleDTO: presaleDTO): Observable<presaleDTO> {
    return this.httpService.post<presaleDTO>(this._presaleURL + "/CreatePresale", presaleDTO);
  }

  //MultiPay
  getPaymentMethod(): Observable<any> {
    return this.httpService.get<any>(this._presaleURL + "/GetPaymentMethod")
  }
  getParameterForPaymentMode(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._parameterURL + "/GetParameterForPaymentMode")
  }
  getParameterForPaymentMethod(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._parameterURL + "/GetParameterForPaymentMethod")
  }
  getFinancialEntities(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._masterURL + "/GetFinancialEntities")
  }
  getOperatorsCard(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._masterURL + "/GetOperatorsCard")
  }
  GetBankAccountsWithFinancialEntityWithCurrency(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._financeURL + "/GetBankAccountsWithFinancialEntityWithCurrency")
  }

  getStatesPresale(): Observable<any[]> {
    return this.httpService.get<any[]>(this._presaleURL + "/GetStatesPresale")
  }

  getAllPresales(queryParams: any): Observable<any> {
    return this.httpService.post<any>(this._presaleURL + '/GetAllPresales', queryParams);
  }

  getPresaleById(id: number): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._presaleURL + '/GetPresaleById/' + id);
  }

  getSettingsShowPresale(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._presaleURL + "/GetSettingsShowPresale");
  }

  getComprobantRepresentationImpresedPresale(queryParams: any): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._presaleURL + "/GetComprobantRepresentationImpresedPresale", { params: queryParams as any });
  }

  getResumeToFinishPresale(id: number): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._presaleURL + "/GetResumeToFinishPresale/" + id);
  }
  createSaleByPresale(saleDTO: saleByPresaleDTO): Observable<responseGenericApi> {
    return this.httpService.post<responseGenericApi>(this._presaleURL + "/FinishPresale", saleDTO);
  }
  confirmPresaleManual(idPresaleOrder: number): Observable<responseGenericApi> {
    const confirmPresaleManual = {
      PresaleOrderId: idPresaleOrder
    };
    return this.httpService.post<responseGenericApi>(this._presaleURL + "/ConfirmPresaleManual", confirmPresaleManual);
  }

  getSettingsFinishPresale(): Observable<any> {
    return this.httpService.get<any>(this._presaleURL + "/GetSettingsFinishPresale");
  }

  GetFiltersReportPresale(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._presaleURL + "/GetFiltersReportPresale");
  }

  getReportByConcept(filters: any): Observable<responseGenericApi> {
    return this.httpService.post<responseGenericApi>(this._presaleURL + "/GetReportByConcept", filters);
  }

  getReportByAdvancePayment(filters: any): Observable<responseGenericApi> {
    return this.httpService.post<responseGenericApi>(this._presaleURL + "/GetReportByAdvancePayment", filters);
  }

  getReportByBasicConcept(filters: any): Observable<responseGenericApi> {
    return this.httpService.post<responseGenericApi>(this._presaleURL + "/GetReportByBasicConcept", filters);
  }

  getReportByPaymentMethod(filters: any): Observable<any> {
    return this.httpService.post<any>(this._presaleURL + "/GetReportByPaymentMethod", filters);
  }

  getReportSaleByPresale(filters: any): Observable<any> {
    return this.httpService.post<any>(this._presaleURL + "/GetReportSaleByPresale", filters);
  }

  getComprobantRepresentationImpresedSaleByPresale(queryParams: any): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._presaleURL + "/GetComprobantRepresentationImpresedSaleByPresale", { params: queryParams as any });
  }

  getPresaleForEditByID(orderID: number): Observable<any> {
    return this.httpService.get<any>(this._presaleURL + "/GetPresaleForEditByID/" + orderID);
  }

  editPresale(presaleDTO: presaleDTO): Observable<presaleDTO> {
    return this.httpService.post<presaleDTO>(this._presaleURL + "/EditPresale", presaleDTO);
  }

  invalidate(data: any) {
    return this.httpService.post<any>(this._presaleURL + "/InvalidatePresale", data);
  }

  checkStock(id: number): Observable<any> {
    return this.httpService.get<any>(this._saleURL + "/CheckStockForSaleByOrderID/" + id);
  }
}
