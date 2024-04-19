import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { RegsiterAdvancePaymentModel } from '@cad-private/models/advance-payment/registerAdvancePayment.model';
import { responseGenericApi } from '@cad-private/shared/models/response/response.model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AdvancePaymentService {
    _advancePaymentURL: string;

    constructor(private httpService: HttpClient, private _configService: ConfigService) {
        this._advancePaymentURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/AdvancePayment`;
    }

    getAdvancePaymentByPresaleID(id: number): Observable<responseGenericApi> {
        return this.httpService.get<any>(this._advancePaymentURL + '/GetAdvancePaymentByPresaleID/' + id);
    }

    CreateAdvancePayment(presaleDTO: RegsiterAdvancePaymentModel): Observable<RegsiterAdvancePaymentModel> {
        return this.httpService.post<RegsiterAdvancePaymentModel>(this._advancePaymentURL + "/CreateAdvancePayment", presaleDTO);
    }
    getAdvancedPaymentComprobantImpresed(queryParams: any): Observable<responseGenericApi> {
        return this.httpService.get<responseGenericApi>(this._advancePaymentURL + '/GetAdvancedPaymentComprobantImpresed/', { params: queryParams as any });
    }

}