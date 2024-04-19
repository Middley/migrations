import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrintSettingService {
  _itemsURL!: string;

  constructor(private _httpService: HttpClient, private _configService: ConfigService) {
    this._itemsURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/PrintSetting`;
  }

  add(printSetting: any): Observable<any> {
    const createPrintSettingCommand = {
      createPrintSettingRequestDTO: printSetting,
    };
    return this._httpService.post<any>(`${this._itemsURL}/Create`, createPrintSettingCommand);
  }

  getAllPrintSettings(queryParams): Observable<any[]> {
    return this._httpService.get<any>(this._itemsURL, { params: queryParams as any }).pipe(map(response => response.items));
  }

  getAllSettings(): Observable<any> {
    return this._httpService.get<any>(this._itemsURL + '/GetSettings');
  }

  getByEstaBlishment(idEstaBlishment: number): Observable<any> {
    return this._httpService.get<any>(this._itemsURL + '/GetByEstablishment/' + idEstaBlishment);
  }

  unSuscribePrintSettings(printSettings: any): Observable<any> {
    const UnSuscribePrintSettingDTO = {
      UnsuscribePrintSettingRequestDTO: printSettings,
    };
    return this._httpService.put(this._itemsURL + '/UnSuscribre', UnSuscribePrintSettingDTO);
  }

  getById(id: number): Observable<any> {
    return this._httpService.get<any>(this._itemsURL + '/GetById/' + id);
  }
  update(printSetting: any): Observable<any> {
    const updatePrintSettingRequestDTO = {
      updatePrintSettingRequestDTO: printSetting,
    };
    return this._httpService.put(this._itemsURL + '/Update', updatePrintSettingRequestDTO);
  }

  ///region Reload
  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }
  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}
