import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  summary: string;
  detail: string;
  constructor(private toastr: ToastrService,
    private _messageService: MessageService,
    private _translate: TranslateService) { }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  getAsyncTranslation(transKey: string | string[], interpolateParams?: object): Observable<any> {
    return this._translate.get(transKey, interpolateParams);
  }

  showSuccess(message: string, title = 'GENERAL.TITLES.SUCCESS') {
    this.summary = this.getTranslation(title);
    this.detail = this.getTranslation(message);
    this.toastr.success(this.detail.toUpperCase(), this.summary.toUpperCase(), {
      positionClass: 'toast-bottom-right',
    });

  }

  showError(message: string, title = 'GENERAL.TITLES.ERROR') {

    this.summary = this.getTranslation(title);
    this.detail = this.getTranslation(message);
    this.toastr.error(this.detail.toUpperCase(), this.summary.toUpperCase(), {
      positionClass: 'toast-bottom-right'
    });
  }

  showInfo(message: string, title = 'GENERAL.TITLES.INFO') {
    this._messageService.add({
      summary: this.getTranslation(title),
      detail: this.getTranslation(message)
    });

    this.toastr.info(message, title, {
      positionClass: 'toast-bottom-right'
    });

  }

  showWarning(message: string, title = 'GENERAL.TITLES.WARNING') {

    this._messageService.add({
      summary: this.getTranslation(title),
      detail: this.getTranslation(message),
    });
    this.toastr.warning(message, title, {
      positionClass: 'toast-bottom-right'
    });

  }
}
