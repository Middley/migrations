import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { responseGenericApi } from '@cad-private/shared/models/response/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessActorService {
  _businessActorURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._businessActorURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/BusinessActor`;
  }

  getBusinessActorById(queryParams): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._businessActorURL + "/GetBusinessActoyById", { params: queryParams as any });
  }


  getClientsByName(name: string): Observable<responseGenericApi> {
    return this.httpService.get<responseGenericApi>(this._businessActorURL + "/GetClientsByName/" + name);
  }

}
