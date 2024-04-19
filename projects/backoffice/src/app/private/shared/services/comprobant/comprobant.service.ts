import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { responseGenericApi } from '@cad-private/shared/models/response/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobantService {
  _comprobantURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._comprobantURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Comprobant`;
  }

  public getAllComprobantByTransaction(queryParams): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._comprobantURL + "/GetComprobantByTransaction", { params: queryParams as any });
  }

  public getPrintFormats(): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._comprobantURL + "/GetFormatsPrint");
  }
}
