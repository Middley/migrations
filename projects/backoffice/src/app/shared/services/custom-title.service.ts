import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class CustomTitleService {
  prefix = environment.production ? '' : ' - SIGES'

  constructor(private titleService: Title ) { }

  set(title:string) {
    //this.titleService.setTitle(this.prefix + title +" - TECHSOLUTION® Perú")
    this.titleService.setTitle( title + this.prefix )
  }
}
