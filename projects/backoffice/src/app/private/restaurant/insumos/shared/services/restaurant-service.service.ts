import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauratService {
  _itemsURL!: string;

  data: any[] = [];
  constructor(private _httpService: HttpClient, private _configService: ConfigService) {
    this._itemsURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/ItemsCategory`;

  }


  GetItemCategoryByCode(codigo: string): Observable<any> {
    return this._httpService.get<any>(this._itemsURL + '/GetItemCategoryByCode/' + codigo);
  }

  GetInsumoItemByCode(codigo: string): Observable<any> {
    return this._httpService.get<any>(this._itemsURL + '/GetInsumoItemByCode/' + codigo);
  }

  GetCategoryByItemsCategoryOfRol(): Observable<any> {
    return this._httpService.get<any>(this._itemsURL + '/GetAllItemsCategoryByRol').pipe(map(data => data));
  }

  GetCategoryByInsumosItemOfRol(): Observable<any> {
    return this._httpService.get<any>(this._itemsURL + '/GetAllInsumosItemByRol').pipe(map(data => data.items));
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
