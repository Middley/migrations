import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  _warehouseURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._warehouseURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Establishment`;
  }

  getAllSettings(): Observable<any> {
    return this.httpService.get<any>(this._warehouseURL + '/GetAllEstablishment');
  }
}
