import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject, map } from 'rxjs';
import { ParametersConfiguration } from '../interfaces/GetParameters';

@Injectable({
    providedIn: 'root'
})
export class ConsumptionService {

    _consumptionURL!: string;
    constructor(private httpService: HttpClient, private _configService: ConfigService) {
        this._consumptionURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/ConsumptionInsumo`;
    }

    GetSettings(): Observable<any> {
        return this.httpService
            .get<ParametersConfiguration>(this._consumptionURL + '/GetSettings');
    }
}