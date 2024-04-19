import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { responseGenericApi } from '@cad-private/shared/models/response/response.model';

@Injectable({
    providedIn: 'root',
})
export class ConceptService {
    _conceptURL: string;
    constructor(private httpService: HttpClient, private _configService: ConfigService) {
        this._conceptURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Concept`;
    }

    GetAllConceptByName(typeWarehouseId: number, idWarehouse: number, name: string): Observable<any> {
        const data = {
            idWarehouse: idWarehouse,
            name: name,
            warehouseRoleId: typeWarehouseId
        };
        return this.httpService.post<any>(this._conceptURL + '/GetAllConceptByName', data);
    }

    GetConcepIdByBarcode(barcode: string): Observable<any> {

        return this.httpService.get<any>(this._conceptURL + '/GetConcepIdByBarcode/' + barcode);
    }

    GetConceptByConceptIdAndWarehouse(typeWarehouseId: number, idWarehouse: number, conceptId: number): Observable<any> {
        const data = {
            idWarehouse: idWarehouse,
            conceptId: conceptId,
            warehouseRoleId: typeWarehouseId
        };

        return this.httpService.post<any>(this._conceptURL + '/GetConceptByConceptIdAndWarehouse', data);
    }

    GetAllConcept(): Observable<any> {
        return this.httpService.get<any>(this._conceptURL + '/GetAllConcept');
    }

    GetConceptWithStockAndSalePriceByIdConcept(idConcept: number): Observable<any> {
        return this.httpService.get<any>(this._conceptURL + '/GetConceptById/+' + idConcept);
    }

    GetParameter(): Observable<any> {
        return this.httpService.get<any>(this._conceptURL + '/GetConceptParameter');
    }

    getBusinessConceptByIdWithComplements(queryParams): Observable<responseGenericApi> {
        return this.httpService.get<responseGenericApi>(this._conceptURL + '/GetBusinessConceptByIdWithComplements', { params: queryParams as any });
    }

    getAllBasicConcept(): Observable<any> {
        return this.httpService.get<any>(this._conceptURL + '/GetAllBasicConcept');
    }


}
