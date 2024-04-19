import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { getSaleParameterDTO } from '../models/parameter/getSaleParameterDTO.model';
import { responseGenericApi } from '../models/response/response.model';
@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  _parameterURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._parameterURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Parameter`;
  }

  getSaleParameterDTO(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._parameterURL + "/GetSaleParameter");
  }

  GetParameterBusinessAcotrSelector(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._parameterURL + "/GetParameterBusinessAcotrSelector");
  }
}
