import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cad-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private _translate: TranslateService, @Inject(DOCUMENT) private _document: Document) {
    _translate.addLangs(['es', 'en']);
    _translate.setDefaultLang('es');
  }

  ngOnInit() {
    this._document.documentElement.lang = 'en';
  }
}
