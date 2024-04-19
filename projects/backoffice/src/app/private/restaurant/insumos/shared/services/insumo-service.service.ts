import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject, map } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse'
import { insumosItem } from '../interfaces/insumosItem';
import { GetItemsByPrincipalConceptId } from '../interfaces/GetItemsByPrincipalConceptId';
import { ParametersConfiguration } from '../interfaces/GetParameters';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  _insumotURL!: string;
  _estimateProductionURL!: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._insumotURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Insumo`;
    this._estimateProductionURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/ProductionEstimateByItem`;
  }


  InsumoRegister(insumo: any): Observable<ApiResponse> {
    const createinsumoCommand = { insumoRequestDto: insumo }

    return this.httpService.post(`${this._insumotURL}/Create`, createinsumoCommand).pipe(map(
      (resp: ApiResponse) => {
        return resp
      }));
  }

  GetParametersForInsumo(): Observable<any> {
    return this.httpService
      .get<ParametersConfiguration>(this._insumotURL + '/GetParameters');
  }

  GetItemsByIdInsumo(id: number): Observable<any> {
    return this.httpService.get<any>(`${this._insumotURL}/GetItemsByIdInsumo/` + id);
  }

  InsumoUpdate(insumo: any): Observable<ApiResponse> {
    const updateinsumoCommand = { insumoRequestDto: insumo }

    return this.httpService.put(`${this._insumotURL}/Update`, updateinsumoCommand).pipe(map(
      (resp: ApiResponse) => {
        return resp
      }));
  }

  DeleteInsumosById(id: number): Observable<ApiResponse> {
    return this.httpService.delete<ApiResponse>(`${this._insumotURL}/UnSuscribre/` + id).pipe(map((resp: ApiResponse) => {
      return resp
    }));
  }
  ///region Reload
  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }
  filter(filterBy: string) {
    this._listener.next(filterBy);
  }



  // Estimación de produccion
  GetItemsByInsumoId(idWarehouse: number, idInsumo: number): Observable<any> {
    const parameters = {
      idWarehouse: idWarehouse,
      idInsumo: idInsumo
    };
    return this.httpService.post<any>(`${this._estimateProductionURL}/GetItemsByPrincipalConceptId`, parameters);
  }

  GetParameters(): Observable<any> {
    return this.httpService.get<any>(`${this._estimateProductionURL}/GetParameters`);
  }

}
