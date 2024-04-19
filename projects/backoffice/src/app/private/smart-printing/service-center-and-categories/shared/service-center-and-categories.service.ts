import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { CreateServiceCenterAndCategoryCommand } from './models/Create/CreateServiceCenterAndCategoryCommand.model';
import { Observable, Subject } from 'rxjs';
import { UnsuscribeServiceCenterAndCategoryByIdCommand } from '../shared/models/Update/UnsuscribeServiceCenterAndCategoryByIdCommand.Model';

@Injectable({
    providedIn: 'root'
})
export class ServiceCenterAndCategoriesService {
    _itemsURL!: string;

    constructor(private _httpService: HttpClient, private _configService: ConfigService) {
        this._itemsURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/ServiceCenterAndCategory`;
    }


    getServiceCentersAndCategoriesByEstaBlishment(idEstablishment): Observable<any> {
        return this._httpService.get<any>(this._itemsURL + '/GetServiceCentersAndCategoriesByEstablishment/' + idEstablishment);
    }
    createServiceCenterAndCategories(GetCategoriesMasterDetailResponseDTO: CreateServiceCenterAndCategoryCommand): Observable<any> {
        return this._httpService.post<CreateServiceCenterAndCategoryCommand>(this._itemsURL + '/Create', GetCategoriesMasterDetailResponseDTO);
    }

    unSuscribeServiceCenterAndCategorie(unsuscribeServiceCenterAndCategoryByIdCommand: UnsuscribeServiceCenterAndCategoryByIdCommand): Observable<any> {
        return this._httpService.put<UnsuscribeServiceCenterAndCategoryByIdCommand>(this._itemsURL + "/UnSuscribe", unsuscribeServiceCenterAndCategoryByIdCommand);
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
