import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { GetWareHousesByRoleInsumoId } from '../interfaces/GetWareHousesByRoleInsumoId';

@Injectable({
    providedIn: 'root',
})
export class WareHouseService {
    _warehouseURL: string;
    constructor(private httpService: HttpClient, private _configService: ConfigService) {
        this._warehouseURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Warehouse`;
    }

    getWarehouseByEstablismentId(establishmentId: number[], typeWarehouseId: number): Observable<any> {
        const data = {
            establismentId: establishmentId,
            roleId: typeWarehouseId,
        };
        return this.httpService.post<any>(this._warehouseURL + '/GetAllWareHouseByEstablishmentId', data);
    }

    GetWareHousesByRoleInsumoId(): Observable<any> {
        return this.httpService.get<GetWareHousesByRoleInsumoId>(this._warehouseURL + '/GetCentersOfAtentionActivesByRoleInsumoId');
    }

}
