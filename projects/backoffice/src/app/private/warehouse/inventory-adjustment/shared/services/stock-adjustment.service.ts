import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { RegisterStockAdjustment } from '../interfaces/register-stock-adjustment.interface';
import { GetAllStockAdjustmentsInterface } from '../interfaces/getall-stock-adjustment.interface';
import { GetStockAdjustmentById } from '../interfaces/get-stock_adjustment-byid.interface';
import { UpdateStockAdjustment } from '../interfaces/update-stock-adjustment.interface';

@Injectable({
    providedIn: 'root',
})
export class StockAdjustmentService {
    _stockAdjustmentURL: string;
    constructor(private httpService: HttpClient, private _configService: ConfigService) {
        this._stockAdjustmentURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/StockAdjustment`;
    }

    GetAllEstablishmentsAndTypeWarehouses(): Observable<any> {
        return this.httpService.get<any>(this._stockAdjustmentURL + '/GetAllEstablishmentsAndTypeWarehouses');
    }

    add(stockAdjustment: RegisterStockAdjustment): Observable<RegisterStockAdjustment> {
        // const stockAdjustmentCommand = {
        //     data: stockAdjustment,
        // };
        return this.httpService.post<RegisterStockAdjustment>(`${this._stockAdjustmentURL}/Create`, stockAdjustment);
    }

    getAll(queryParams): Observable<GetAllStockAdjustmentsInterface[]> {
        return this.httpService
            .get<any>(this._stockAdjustmentURL + '/GetAllStockAdjustment', { params: queryParams as any })
            .pipe(map(response => response.items));
    }

    getById(id: number): Observable<any> {
        return this.httpService
            .get<GetStockAdjustmentById>(this._stockAdjustmentURL + '/GetById/' + id);
    }

    GetByIdForEdit(id: number): Observable<any> {
        return this.httpService
            .get<GetStockAdjustmentById>(this._stockAdjustmentURL + '/GetByIdForEdit/' + id);
    }

    Update(stockAdjustment: UpdateStockAdjustment): Observable<UpdateStockAdjustment> {
        const stockAdjustmentCommand = {
            data: stockAdjustment,
        };
        return this.httpService.put<UpdateStockAdjustment>(`${this._stockAdjustmentURL}/UpdateStockAdjustmentCommand`, stockAdjustmentCommand);
    }

    ConfirmStockAdjustment(id: number): Observable<any> {
        const stockAdjustmentCommand = {
            id: id,
        };
        return this.httpService.put<any>(`${this._stockAdjustmentURL}/ConfirmStockAdjustment`, stockAdjustmentCommand);
    }

    getAllStockAdjustmentBySearch(filter): Observable<any> {
        return this.httpService.post<any>(this._stockAdjustmentURL + '/GetBySearch', filter);
    }
}
